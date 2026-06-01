import { useState, useRef, useEffect } from 'react';
import { T, FONTS } from '../tokens';
import {
  normalizeImages,
  NoteImageGallery,
  NoteImageEditor,
  ImageLightbox,
} from './NoteReferenceImages';
import NoteFormatToolbar from './NoteFormatToolbar';
import NoteFormattedContent from './NoteFormattedContent';

const HEADING = "'Clash Display', 'Outfit', sans-serif";

const STATUS_STYLE = {
  Complete:      { bg: 'rgba(0,255,179,0.08)',  color: '#00ffb3' },
  'In Progress': { bg: 'rgba(0,212,255,0.08)',  color: '#00d4ff' },
  Pending:       { bg: 'rgba(255,204,0,0.08)',  color: '#ffcc00' },
};

export default function NoteReader({
  note,
  domain,
  indexMeta,
  onBack,
  onPrev,
  onNext,
  onSaveNote,
  initialEditMode = false,
}) {
  const [editing, setEditing] = useState(initialEditMode);
  const [draftContent, setDraftContent] = useState(note.content);
  const [draftImages, setDraftImages] = useState(() => normalizeImages(note.images));
  const [lightboxUrl, setLightboxUrl] = useState(null);
  const [showPreview, setShowPreview] = useState(true);
  const textareaRef = useRef(null);

  useEffect(() => {
    setEditing(initialEditMode);
    setDraftContent(note.content);
    setDraftImages(normalizeImages(note.images));
  }, [note.id, initialEditMode]); // eslint-disable-line

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [note.id]);

  function autoResize() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.max(320, el.scrollHeight) + 'px';
  }

  useEffect(() => {
    autoResize();
  }, [draftContent, editing]);

  useEffect(() => {
    if (editing && textareaRef.current) {
      textareaRef.current.focus();
      const len = textareaRef.current.value.length;
      textareaRef.current.setSelectionRange(len, len);
    }
  }, [editing]);

  const s = STATUS_STYLE[note.status] || STATUS_STYLE.Pending;

  function handleSave() {
    const images = draftImages.filter(img => img.url);
    onSaveNote(note.id, { content: draftContent, images: images.length ? images : undefined });
    setEditing(false);
  }

  const hasImages = normalizeImages(note.images).length > 0;

  return (
    <div className="note-reader" style={{ background: T.bg }}>
      <div className="note-reader-header" style={{
        position: 'sticky', top: 0, zIndex: 20,
        background: `linear-gradient(180deg, ${T.bg} 85%, transparent)`,
        borderBottom: `1px solid ${T.border}`,
        backdropFilter: 'blur(8px)',
      }}>
        <div className="note-reader-toolbar flex items-center justify-between gap-4 flex-wrap">
          <button
            type="button"
            onClick={onBack}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              fontFamily: FONTS.mono, fontSize: 12,
              padding: '8px 14px', borderRadius: 8,
              border: `1px solid ${T.border2}`,
              background: T.surface2, color: T.text,
              cursor: 'pointer', transition: 'all 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = T.cyan;
              e.currentTarget.style.color = T.cyan;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = T.border2;
              e.currentTarget.style.color = T.text;
            }}
          >
            <span style={{ fontSize: 16 }}>←</span>
            Back to Index
          </button>

          {indexMeta && (
            <div className="note-reader-nav-pills flex items-center gap-2">
              <button
                type="button"
                onClick={onPrev}
                disabled={!indexMeta.hasPrev}
                style={navBtnStyle(indexMeta.hasPrev)}
              >
                ← Previous
              </button>
              <span style={{
                fontFamily: FONTS.mono, fontSize: 12, color: T.muted,
                padding: '0 10px', minWidth: 72, textAlign: 'center',
              }}>
                {indexMeta.num} of {String(indexMeta.total).padStart(2, '0')}
              </span>
              <button
                type="button"
                onClick={onNext}
                disabled={!indexMeta.hasNext}
                style={navBtnStyle(indexMeta.hasNext)}
              >
                Next →
              </button>
            </div>
          )}

          <div className="flex items-center gap-2">
            {editing ? (
              <button type="button" onClick={handleSave} style={actionBtn(T.green, 'rgba(0,255,179,0.07)', 'rgba(0,255,179,0.4)')}>
                ✅ Save Notes
              </button>
            ) : (
              <button type="button" onClick={() => setEditing(true)} style={actionBtn(T.cyan, 'rgba(0,212,255,0.07)', 'rgba(0,212,255,0.35)')}>
                ✏️ Edit Notes
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main reading area */}
      <div className="note-reader-body" style={{
        flex: 1, maxWidth: 860, margin: '0 auto', width: '100%',
      }}>
        <div style={{
          fontFamily: FONTS.mono, fontSize: 10, color: T.cyan,
          letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8,
        }}>
          {domain.icon} {domain.label.toUpperCase()} · NOTE {indexMeta?.num || '—'}
        </div>

        <h1 className="note-reader-title" style={{
          fontFamily: HEADING, fontWeight: 700,
          color: T.text, margin: '0 0 16px', lineHeight: 1.2,
        }}>
          {note.topic || 'Untitled'}
        </h1>

        {note.preview && !editing && (
          <p style={{
            fontSize: 16, color: T.muted, lineHeight: 1.65,
            margin: '0 0 24px', maxWidth: 640,
          }}>
            {note.preview}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-3 mb-8">
          {note.tags.map(tag => (
            <span key={tag} style={{
              fontFamily: FONTS.mono, fontSize: 11, padding: '4px 12px',
              background: T.surface2, border: `1px solid ${T.border}`,
              borderRadius: 999, color: T.muted,
            }}>
              {tag}
            </span>
          ))}
          <span style={{
            fontFamily: FONTS.mono, fontSize: 11, padding: '4px 12px',
            borderRadius: 999, background: s.bg, color: s.color,
          }}>
            {note.status}
          </span>
          <span style={{ fontFamily: FONTS.mono, fontSize: 12, color: T.dim }}>
            Updated {note.updatedAt}
          </span>
        </div>

        {editing ? (
          <NoteImageEditor images={draftImages} onChange={setDraftImages} />
        ) : hasImages ? (
          <NoteImageGallery images={note.images} onImageClick={setLightboxUrl} />
        ) : null}

        <div style={{
          fontFamily: FONTS.mono, fontSize: 10, letterSpacing: '0.1em',
          color: T.dim, textTransform: 'uppercase', marginBottom: 12,
        }}>
          Your Notes
        </div>

        {editing ? (
          <div>
            <NoteFormatToolbar
              textareaRef={textareaRef}
              onChange={val => { setDraftContent(val); autoResize(); }}
            />
            <div className="flex items-center justify-end gap-2" style={{
              background: T.surface2,
              borderLeft: `1px solid ${T.border}`,
              borderRight: `1px solid ${T.border}`,
              padding: '6px 12px',
            }}>
              <button
                type="button"
                onClick={() => setShowPreview(v => !v)}
                style={{
                  fontFamily: FONTS.mono, fontSize: 10, padding: '4px 10px',
                  borderRadius: 6, border: `1px solid ${T.border}`,
                  background: showPreview ? 'rgba(0,212,255,0.1)' : T.surface3,
                  color: showPreview ? T.cyan : T.muted, cursor: 'pointer',
                }}
              >
                {showPreview ? '👁 Preview on' : '👁 Preview off'}
              </button>
            </div>
            <textarea
              ref={textareaRef}
              value={draftContent}
              onChange={e => { setDraftContent(e.target.value); autoResize(); }}
              placeholder={'# Big heading (cyan)\n## Medium heading (green)\n**bold** and [cyan]colored text[/cyan]\n\n- bullet point\n> quote block'}
              style={{
                width: '100%', background: T.surface,
                border: `1px solid ${T.border2}`,
                borderRadius: showPreview ? 0 : '0 0 16px 16px',
                borderTop: 'none',
                color: T.text, fontSize: 15, lineHeight: 1.75,
                padding: '20px 24px', outline: 'none', resize: 'vertical',
                minHeight: 280, fontFamily: FONTS.mono, boxSizing: 'border-box',
              }}
              onFocus={e => (e.target.style.borderColor = T.cyan)}
              onBlur={e  => (e.target.style.borderColor = T.border2)}
            />
            {showPreview && (
              <div style={{
                background: T.surface,
                border: `1px solid ${T.border2}`,
                borderTop: `1px dashed ${T.border}`,
                borderRadius: '0 0 16px 16px',
                padding: '24px 28px',
                minHeight: 120,
              }}>
                <div style={{
                  fontFamily: FONTS.mono, fontSize: 10, color: T.dim,
                  letterSpacing: '0.08em', marginBottom: 14,
                }}>
                  LIVE PREVIEW
                </div>
                <NoteFormattedContent content={draftContent} />
              </div>
            )}
          </div>
        ) : (
          <div style={{
            background: T.surface,
            border: `1px solid ${T.border}`,
            borderRadius: 16,
            padding: '32px 36px',
            minHeight: 280,
          }}>
            <NoteFormattedContent content={note.content} />
          </div>
        )}
      </div>

      {/* Bottom navigation (mobile-friendly) */}
      {indexMeta && (
        <div className="note-reader-footer" style={{
          position: 'sticky', bottom: 0,
          background: `linear-gradient(0deg, ${T.bg} 75%, transparent)`,
          borderTop: `1px solid ${T.border}`,
        }}>
          <div className="note-reader-footer-nav flex items-center justify-between" style={{ maxWidth: 860, margin: '0 auto' }}>
            <button type="button" onClick={onPrev} disabled={!indexMeta.hasPrev} style={navBtnStyle(indexMeta.hasPrev, true)}>
              ← Previous topic
            </button>
            <button type="button" onClick={onBack} style={{
              ...navBtnStyle(true, true),
              borderColor: 'rgba(0,212,255,0.35)',
              color: T.cyan,
            }}>
              📑 Index
            </button>
            <button type="button" onClick={onNext} disabled={!indexMeta.hasNext} style={navBtnStyle(indexMeta.hasNext, true)}>
              Next topic →
            </button>
          </div>
        </div>
      )}

      <ImageLightbox url={lightboxUrl} onClose={() => setLightboxUrl(null)} />
    </div>
  );
}

function navBtnStyle(enabled, large = false) {
  return {
    fontFamily: FONTS.mono,
    fontSize: large ? 12 : 11,
    padding: large ? '10px 16px' : '6px 12px',
    borderRadius: 8,
    border: `1px solid ${T.border}`,
    background: enabled ? T.surface2 : 'transparent',
    color: enabled ? T.text : T.dim,
    cursor: enabled ? 'pointer' : 'default',
    transition: 'all 0.15s',
  };
}

function actionBtn(color, bg, border) {
  return {
    fontFamily: FONTS.mono,
    fontSize: 12,
    padding: '8px 18px',
    borderRadius: 8,
    border: `1px solid ${border}`,
    background: bg,
    color,
    cursor: 'pointer',
    transition: 'all 0.15s',
  };
}
