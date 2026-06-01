import { useState } from 'react';
import { T, FONTS } from '../tokens';
import { normalizeImages } from './NoteReferenceImages';

const HEADING = "'Clash Display', 'Outfit', sans-serif";

const STATUS_STYLE = {
  Complete:    { bg: 'rgba(0,255,179,0.08)',  color: '#00ffb3', border: 'rgba(0,255,179,0.2)',  accent: '#00ffb3' },
  'In Progress': { bg: 'rgba(0,212,255,0.08)', color: '#00d4ff', border: 'rgba(0,212,255,0.2)', accent: '#00d4ff' },
  Pending:     { bg: 'rgba(255,204,0,0.08)',  color: '#ffcc00', border: 'rgba(255,204,0,0.2)',  accent: '#ffcc00' },
};

const STATUS_ORDER = ['Complete', 'In Progress', 'Pending'];

const FILTER_OPTIONS = [
  { key: 'all',          label: 'All',              emoji: null },
  { key: 'Complete',     label: '✅ Complete',       emoji: '✅' },
  { key: 'In Progress',  label: '🔄 In Progress',   emoji: '🔄' },
  { key: 'Pending',      label: '⏳ Pending',        emoji: '⏳' },
];

const EMPTY_STATE = {
  all:         { emoji: '📭', title: 'No notes yet',           sub: 'Add your first note to get started.' },
  Complete:    { emoji: '✅', title: 'No Complete notes yet',  sub: 'Mark notes as complete as you finish them.' },
  'In Progress': { emoji: '🔄', title: 'No In Progress notes yet', sub: 'Start studying a topic to track progress.' },
  Pending:     { emoji: '⏳', title: 'No Pending notes yet',   sub: 'All caught up — nothing waiting to start.' },
};

const inputBase = {
  background:   T.surface2,
  border:       `1px solid ${T.border2}`,
  color:        T.text,
  borderRadius: 6,
  padding:      '4px 8px',
  fontSize:     13,
  outline:      'none',
  width:        '100%',
  fontFamily:   FONTS.body,
  transition:   'border-color 0.15s',
};

function EditInput({ value, onChange, placeholder }) {
  return (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={inputBase}
      onFocus={e => (e.target.style.borderColor = T.cyan)}
      onBlur={e  => (e.target.style.borderColor = T.border2)}
    />
  );
}

function EditSelect({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{ ...inputBase, appearance: 'none', cursor: 'pointer', paddingRight: 8 }}
      onFocus={e => (e.target.style.borderColor = T.cyan)}
      onBlur={e  => (e.target.style.borderColor = T.border2)}
    >
      <option value="Complete">Complete</option>
      <option value="In Progress">In Progress</option>
      <option value="Pending">Pending</option>
    </select>
  );
}

function SectionDivider({ label }) {
  return (
    <div className="notes-section-divider flex items-center gap-3 mb-1 mt-2">
      <span style={{
        fontFamily: FONTS.mono, fontSize: 10, letterSpacing: '0.1em',
        color: T.dim, textTransform: 'uppercase', whiteSpace: 'nowrap',
      }}>
        {label}
      </span>
      <div className="flex-1" style={{ height: 1, background: T.border }} />
    </div>
  );
}

function NoteCard({ note, index, onView, onEdit }) {
  const s = STATUS_STYLE[note.status] || STATUS_STYLE.Pending;
  const num = String(index + 1).padStart(2, '0');
  const thumbs = normalizeImages(note.images);
  const thumbUrl = thumbs[0]?.url;

  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: T.surface,
        border: `1px solid ${T.border}`,
        borderRadius: 12,
        padding: 16,
        transition: 'border-color 0.18s, transform 0.18s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = T.border2;
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = T.border;
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Accent bar */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
        background: s.accent, borderRadius: '12px 0 0 12px',
      }} />

      {/* Row 1: number + status */}
      <div className="flex items-center justify-between mb-[10px]" style={{ paddingLeft: 6 }}>
        <span style={{
          fontFamily: FONTS.mono, fontSize: 10,
          background: T.surface2, border: `1px solid ${T.border}`,
          borderRadius: 5, padding: '2px 7px', color: T.muted,
        }}>
          {num}
        </span>
        <span style={{
          fontFamily: FONTS.mono, fontSize: 10, borderRadius: 999,
          padding: '2px 10px', background: s.bg, color: s.color,
          border: `1px solid ${s.border}`,
        }}>
          {note.status}
        </span>
      </div>

      {/* Row 2: title */}
      <div
        onClick={() => onView(note)}
        style={{
          paddingLeft: 6, fontSize: 14, fontWeight: 700, color: T.text,
          marginBottom: 7, lineHeight: 1.4, cursor: 'pointer',
        }}
        onMouseEnter={e => (e.currentTarget.style.color = T.cyan)}
        onMouseLeave={e => (e.currentTarget.style.color = T.text)}
      >
        {note.topic || 'Untitled'}
      </div>

      {thumbUrl && (
        <div style={{ paddingLeft: 6, marginBottom: 10, borderRadius: 8, overflow: 'hidden', border: `1px solid ${T.border}` }}>
          <img
            src={thumbUrl}
            alt=""
            style={{ width: '100%', height: 100, objectFit: 'cover', display: 'block', background: T.surface2 }}
          />
        </div>
      )}

      {/* Row 3: preview */}
      <p style={{
        paddingLeft: 6, fontSize: 12, color: T.muted, lineHeight: 1.6,
        marginBottom: 12, marginTop: 0,
        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>
        {note.preview || 'No preview yet.'}
      </p>

      {/* Row 4: tags */}
      <div className="flex flex-wrap gap-[5px]" style={{ paddingLeft: 6 }}>
        {note.tags.map(tag => (
          <span key={tag} style={{
            fontFamily: FONTS.mono, fontSize: 10,
            background: T.surface2, border: `1px solid ${T.border}`,
            borderRadius: 4, padding: '2px 8px', color: T.muted,
          }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 pt-[10px]"
        style={{ paddingLeft: 6, borderTop: `1px solid ${T.border}` }}>
        <span style={{ fontFamily: FONTS.mono, fontSize: 11, color: T.dim }}>
          {note.updatedAt}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onView(note)}
            title="View"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: T.muted, padding: '2px 5px', borderRadius: 5, fontSize: 14,
              transition: 'color 0.15s, background 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = T.cyan; e.currentTarget.style.background = 'rgba(0,212,255,0.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = T.muted; e.currentTarget.style.background = 'none'; }}
          >
            👁
          </button>
          <button
            onClick={e => { e.stopPropagation(); onEdit(note); }}
            title="Edit"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: T.muted, padding: '2px 5px', borderRadius: 5, fontSize: 14,
              transition: 'color 0.15s, background 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = T.cyan; e.currentTarget.style.background = 'rgba(0,212,255,0.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = T.muted; e.currentTarget.style.background = 'none'; }}
          >
            ✏️
          </button>
        </div>
      </div>
    </div>
  );
}

function NotesIndex({ notes, onSelectNote, activeFilter }) {
  const filtered = activeFilter === 'all'
    ? notes
    : notes.filter(n => n.status === activeFilter);

  if (filtered.length === 0) {
    const empty = EMPTY_STATE[activeFilter] || EMPTY_STATE.all;
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div style={{ fontSize: 48, marginBottom: 12 }}>{empty.emoji}</div>
        <div style={{ fontFamily: HEADING, fontSize: 18, fontWeight: 700, color: T.text, marginBottom: 6 }}>
          {empty.title}
        </div>
        <p style={{ fontSize: 13, color: T.muted, margin: 0 }}>{empty.sub}</p>
      </div>
    );
  }

  function renderRows(list, startNum = 1) {
    return list.map((note, i) => {
      const num = String(startNum + i).padStart(2, '0');
      const s = STATUS_STYLE[note.status] || STATUS_STYLE.Pending;
      const title = note.topic || 'Untitled';

      return (
        <button
          key={note.id}
          type="button"
          onClick={() => onSelectNote(note)}
          className="w-full text-left"
          style={{
            display: 'block',
            padding: '18px 24px',
            background: 'transparent',
            border: 'none',
            borderBottom: `1px solid ${T.border}`,
            cursor: 'pointer',
            transition: 'background 0.15s, border-color 0.15s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = T.surface2;
            e.currentTarget.style.borderBottomColor = T.border2;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderBottomColor = T.border;
          }}
        >
          <div className="flex items-start gap-4">
            <span style={{
              fontFamily: FONTS.mono, fontSize: 13, color: T.cyan, fontWeight: 700,
              width: 32, flexShrink: 0, marginTop: 2,
            }}>
              {num}
            </span>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="index-row-header flex items-center justify-between gap-3 mb-1">
                <span className="index-row-title" style={{ fontSize: 16, fontWeight: 700, color: T.text }}>
                  {title}
                </span>
                <span style={{
                  fontFamily: FONTS.mono, fontSize: 11, color: T.cyan, flexShrink: 0,
                }}>
                  Read note →
                </span>
              </div>
              {note.preview && (
                <p style={{
                  fontSize: 13, color: T.muted, lineHeight: 1.55,
                  margin: '0 0 10px',
                  display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}>
                  {note.preview}
                </p>
              )}
              <div className="flex items-center gap-2 flex-wrap">
                {normalizeImages(note.images).length > 0 && (
                  <span style={{
                    fontFamily: FONTS.mono, fontSize: 10, padding: '3px 8px',
                    borderRadius: 999, background: T.surface3,
                    border: `1px solid ${T.border}`, color: T.cyan,
                  }}>
                    📷 {normalizeImages(note.images).length}
                  </span>
                )}
                <span style={{
                  fontFamily: FONTS.mono, fontSize: 10, padding: '3px 10px',
                  borderRadius: 999, background: s.bg, color: s.color,
                  border: `1px solid ${s.border}`,
                }}>
                  {note.status}
                </span>
                <span style={{ fontFamily: FONTS.mono, fontSize: 11, color: T.dim }}>
                  {note.updatedAt}
                </span>
              </div>
            </div>
          </div>
        </button>
      );
    });
  }

  if (activeFilter !== 'all') {
    return (
      <div style={{
        background: T.surface, border: `1px solid ${T.border}`,
        borderRadius: 14, overflow: 'hidden',
      }}>
        <IndexHeader domainNoteCount={filtered.length} />
        {renderRows(filtered)}
        <IndexFooter />
      </div>
    );
  }

  let rowNum = 1;
  const sections = [];

  STATUS_ORDER.forEach(status => {
    const group = filtered.filter(n => n.status === status);
    if (group.length === 0) return;
    sections.push(
      <div key={status} style={{
        padding: '10px 16px 6px',
        background: T.surface2,
        borderBottom: `1px solid ${T.border}`,
      }}>
        <span style={{
          fontFamily: FONTS.mono, fontSize: 10, letterSpacing: '0.1em',
          color: T.dim, textTransform: 'uppercase',
        }}>
          {status}
        </span>
      </div>
    );
    sections.push(...renderRows(group, rowNum));
    rowNum += group.length;
  });

  return (
    <div style={{
      background: T.surface, border: `1px solid ${T.border}`,
      borderRadius: 14, overflow: 'hidden',
    }}>
      <IndexHeader domainNoteCount={filtered.length} />
      {sections}
      <IndexFooter />
    </div>
  );
}

function IndexFooter() {
  return (
    <div style={{
      padding: '16px 24px', borderTop: `1px solid ${T.border}`,
      background: T.surface2, textAlign: 'center',
    }}>
      <p style={{ fontFamily: FONTS.mono, fontSize: 12, color: T.muted, margin: 0 }}>
        📖 Tap any topic to open it full screen
      </p>
    </div>
  );
}

function IndexHeader({ domainNoteCount }) {
  return (
    <div style={{
      padding: '28px 28px 22px',
      borderBottom: `1px solid ${T.border}`,
      background: `linear-gradient(135deg, ${T.surface2} 0%, ${T.surface} 60%)`,
    }}>
      <div style={{
        fontFamily: FONTS.mono, fontSize: 10, letterSpacing: '0.14em',
        color: T.cyan, textTransform: 'uppercase', marginBottom: 8,
      }}>
        📑 Table of Contents
      </div>
      <div style={{
        fontFamily: HEADING, fontSize: 28, fontWeight: 700, color: T.text,
        marginBottom: 8,
      }}>
        Notebook Index
      </div>
      <p style={{ fontSize: 14, color: T.muted, margin: 0, lineHeight: 1.5 }}>
        {domainNoteCount} {domainNoteCount === 1 ? 'topic' : 'topics'} in this notebook.
        Choose one below to read the full note.
      </p>
    </div>
  );
}

function NotesTable({ notes, editMode, onOpenDrawer, onPatchNote, onDeleteNote }) {
  return (
    <div className="table-scroll" style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: T.surface2, borderBottom: `1px solid ${T.border}` }}>
            {['TOPIC', 'TAGS', 'STATUS', 'NOTES', 'LAST UPDATED', ...(editMode ? [''] : [])].map(h => (
              <th key={h} style={{
                fontFamily: FONTS.mono, fontSize: 10, color: T.dim,
                letterSpacing: '0.08em', padding: '11px 18px', textAlign: 'left', fontWeight: 500,
              }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {notes.map((n, i) => {
            const s = STATUS_STYLE[n.status] || STATUS_STYLE.Pending;
            const isLast = i === notes.length - 1;

            return (
              <tr
                key={n.id || i}
                style={{
                  borderBottom: isLast ? 'none' : `1px solid ${T.border}`,
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = T.surface2)}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <td style={{ padding: '10px 18px', maxWidth: 190 }}>
                  {editMode ? (
                    <EditInput
                      value={n.topic}
                      placeholder="Topic…"
                      onChange={val => onPatchNote(n.id, 'topic', val)}
                    />
                  ) : (
                    <span
                      onClick={() => onOpenDrawer(n)}
                      style={{
                        fontSize: 13.5, color: T.text, fontWeight: 500, cursor: 'pointer',
                        borderBottom: '1px solid transparent', transition: 'color 0.15s, border-color 0.15s',
                        paddingBottom: 1,
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = T.cyan; e.currentTarget.style.borderBottomColor = T.cyan; }}
                      onMouseLeave={e => { e.currentTarget.style.color = T.text; e.currentTarget.style.borderBottomColor = 'transparent'; }}
                    >
                      {n.topic}
                    </span>
                  )}
                </td>

                <td style={{ padding: '10px 18px', minWidth: 140 }}>
                  {editMode ? (
                    <EditInput
                      value={n.tags.join(', ')}
                      placeholder="tag1, tag2…"
                      onChange={val =>
                        onPatchNote(n.id, 'tags', val.split(',').map(t => t.trim()).filter(Boolean))
                      }
                    />
                  ) : (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {n.tags.map(t => (
                        <span key={t} style={{
                          fontFamily: FONTS.mono, fontSize: 10, padding: '2px 8px',
                          background: T.surface3, border: `1px solid ${T.border}`, borderRadius: 4, color: T.muted,
                        }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </td>

                <td style={{ padding: '10px 18px', minWidth: 130 }}>
                  {editMode ? (
                    <EditSelect value={n.status} onChange={val => onPatchNote(n.id, 'status', val)} />
                  ) : (
                    <span style={{
                      fontFamily: FONTS.mono, fontSize: 11, padding: '3px 10px',
                      borderRadius: 6, background: s.bg, color: s.color,
                    }}>
                      {n.status}
                    </span>
                  )}
                </td>

                <td style={{ padding: '10px 18px', maxWidth: 220 }}>
                  {editMode ? (
                    <EditInput
                      value={n.preview}
                      placeholder="Short preview…"
                      onChange={val => onPatchNote(n.id, 'preview', val)}
                    />
                  ) : (
                    <span style={{
                      fontSize: 12.5, color: T.muted,
                      display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>
                      {n.preview}
                    </span>
                  )}
                </td>

                <td style={{ padding: '10px 18px', fontFamily: FONTS.mono, fontSize: 12, color: T.dim, whiteSpace: 'nowrap' }}>
                  {n.updatedAt}
                </td>

                {editMode && (
                  <td style={{ padding: '10px 14px', textAlign: 'center' }}>
                    <button
                      onClick={() => onDeleteNote(n.id)}
                      title="Delete row"
                      style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        fontSize: 16, color: T.dim, padding: '2px 4px', borderRadius: 4,
                        transition: 'color 0.15s', lineHeight: 1,
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = T.pink)}
                      onMouseLeave={e => (e.currentTarget.style.color = T.dim)}
                    >
                      🗑️
                    </button>
                  </td>
                )}
              </tr>
            );
          })}

          {notes.length === 0 && (
            <tr>
              <td colSpan={editMode ? 6 : 5} style={{
                padding: '40px 20px', textAlign: 'center',
                fontFamily: FONTS.mono, fontSize: 13, color: T.dim,
              }}>
                No notes yet — click "+ Add Note" to get started.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default function NotesView({
  domain,
  stackMeta,
  onBackToStacks,
  notes,
  editMode,
  onToggleEdit,
  onAddNote,
  onViewNote,
  onEditNote,
  onPatchNote,
  onDeleteNote,
}) {
  const [viewMode, setViewMode]     = useState('index');
  const [activeFilter, setActiveFilter] = useState('all');

  const counts = {
    all:         notes.length,
    Complete:    notes.filter(n => n.status === 'Complete').length,
    'In Progress': notes.filter(n => n.status === 'In Progress').length,
    Pending:     notes.filter(n => n.status === 'Pending').length,
  };

  const completed = counts.Complete;
  const pending   = counts.Pending;

  const filtered = activeFilter === 'all'
    ? notes
    : notes.filter(n => n.status === activeFilter);

  function renderCards() {
    if (filtered.length === 0) {
      const empty = EMPTY_STATE[activeFilter] || EMPTY_STATE.all;
      return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div style={{ fontSize: 48, marginBottom: 12 }}>{empty.emoji}</div>
          <div style={{ fontFamily: HEADING, fontSize: 18, fontWeight: 700, color: T.text, marginBottom: 6 }}>
            {empty.title}
          </div>
          <p style={{ fontSize: 13, color: T.muted, margin: 0 }}>{empty.sub}</p>
        </div>
      );
    }

    if (activeFilter !== 'all') {
      return (
        <div className="notes-cards-grid">
          {filtered.map((note, i) => (
            <NoteCard
              key={note.id}
              note={note}
              index={i}
              onView={onViewNote}
              onEdit={onEditNote}
            />
          ))}
        </div>
      );
    }

    const elements = [];
    let globalIndex = 0;
    STATUS_ORDER.forEach(status => {
      const group = filtered.filter(n => n.status === status);
      if (group.length === 0) return;
      elements.push(<SectionDivider key={`div-${status}`} label={status} />);
      group.forEach(note => {
        elements.push(
          <NoteCard
            key={note.id}
            note={note}
            index={globalIndex}
            onView={onViewNote}
            onEdit={onEditNote}
          />
        );
        globalIndex += 1;
      });
    });
    return <div className="notes-cards-grid">{elements}</div>;
  }

  return (
    <div>
      {/* ── Topbar ── */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
        <div className="min-w-0">
          {onBackToStacks && (
            <button
              type="button"
              onClick={onBackToStacks}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontFamily: FONTS.mono, fontSize: 11, marginBottom: 10,
                padding: '5px 12px', borderRadius: 7,
                border: `1px solid ${T.border2}`, background: T.surface2,
                color: T.muted, cursor: 'pointer',
              }}
            >
              ← All Stacks
            </button>
          )}
          <div style={{
            fontFamily: FONTS.mono, fontSize: 10,
            color: stackMeta?.color || T.cyan,
            letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4,
          }}>
            {stackMeta
              ? `${domain.label.toUpperCase()} · ${stackMeta.label.toUpperCase()}`
              : `${domain.label.toUpperCase()} NOTES`}
          </div>
          <h1 style={{
            fontFamily: HEADING, fontSize: 20, fontWeight: 700,
            color: T.text, margin: 0, lineHeight: 1.2,
          }}>
            {stackMeta ? `${stackMeta.icon} ${stackMeta.label}` : `${domain.label} Notes`}
          </h1>
          {stackMeta && (
            <p style={{ fontSize: 13, color: T.muted, margin: '6px 0 0' }}>
              {stackMeta.description}
            </p>
          )}
        </div>

        <div className="notes-topbar-actions flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
          <div className="notes-view-toggle" style={{
            display: 'flex', background: T.surface2, border: `1px solid ${T.border}`,
            borderRadius: 8, padding: 3,
          }}>
            {[
              { key: 'index', label: 'Index' },
              { key: 'cards', label: 'Cards' },
              { key: 'table', label: 'Table' },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setViewMode(key)}
                style={{
                  fontFamily: FONTS.mono, fontSize: 11,
                  padding: '5px 10px', borderRadius: 6, border: 'none', cursor: 'pointer',
                  background: viewMode === key ? T.surface3 : 'transparent',
                  color: viewMode === key ? T.text : T.muted,
                  transition: 'all 0.15s',
                }}
              >
                {label}
              </button>
            ))}
          </div>

          <button
            onClick={onToggleEdit}
            style={{
              fontFamily: FONTS.mono, fontSize: 12,
              padding: '6px 14px', borderRadius: 7,
              border: `1px solid ${T.border2}`,
              background: T.surface2, color: T.muted, cursor: 'pointer',
              transition: 'color 0.15s, border-color 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = T.text; e.currentTarget.style.borderColor = T.cyan; }}
            onMouseLeave={e => { e.currentTarget.style.color = T.muted; e.currentTarget.style.borderColor = T.border2; }}
          >
            {editMode ? '✅ Save' : '✏️ Edit'}
          </button>

          <button
            onClick={onAddNote}
            style={{
              fontFamily: FONTS.mono, fontSize: 12,
              padding: '6px 14px', borderRadius: 7,
              border: '1px solid rgba(0,212,255,0.3)',
              background: 'rgba(0,212,255,0.1)', color: T.cyan, cursor: 'pointer',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,212,255,0.18)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,212,255,0.1)')}
          >
            + Add Note
          </button>
        </div>
      </div>

      {/* ── Mini stats ── */}
      <div className="notes-stats-grid grid grid-cols-3 gap-[10px] mb-5">
        {[
          { label: 'Total Notes', value: notes.length, color: T.text, border: T.border },
          { label: 'Completed',   value: completed,      color: T.green, border: 'rgba(0,255,179,0.2)' },
          { label: 'Pending',     value: pending,        color: T.yellow, border: 'rgba(255,204,0,0.2)' },
        ].map(({ label, value, color, border }) => (
          <div key={label} style={{
            background: T.surface, border: `1px solid ${border}`,
            borderRadius: 10, padding: '12px 14px',
          }}>
            <div style={{ fontSize: 22, fontWeight: 700, color, lineHeight: 1.1 }}>{value}</div>
            <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: T.muted, marginTop: 4 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* ── Filter pills ── */}
      {(viewMode === 'cards' || viewMode === 'index') && (
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <span style={{ fontFamily: FONTS.mono, fontSize: 11, color: T.muted }}>Filter:</span>
          {FILTER_OPTIONS.map(({ key, label }) => {
            const isActive = activeFilter === key;
            const count = counts[key];
            const displayLabel = key === 'all' ? `All (${count})` : `${label} (${count})`;
            return (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                style={{
                  fontFamily: FONTS.mono, fontSize: 12, borderRadius: 999,
                  padding: '5px 13px', cursor: 'pointer', transition: 'all 0.15s',
                  background: isActive ? 'rgba(0,212,255,0.1)' : T.surface2,
                  border: `1px solid ${isActive ? 'rgba(0,212,255,0.35)' : T.border}`,
                  color: isActive ? T.cyan : T.muted,
                }}
              >
                {displayLabel}
              </button>
            );
          })}
        </div>
      )}

      {/* ── Content ── */}
      {viewMode === 'index' && (
        <NotesIndex
          notes={notes}
          activeFilter={activeFilter}
          onSelectNote={onViewNote}
        />
      )}
      {viewMode === 'cards' && renderCards()}
      {viewMode === 'table' && (
        <NotesTable
          notes={notes}
          editMode={editMode}
          onOpenDrawer={onViewNote}
          onPatchNote={onPatchNote}
          onDeleteNote={onDeleteNote}
        />
      )}
    </div>
  );
}
