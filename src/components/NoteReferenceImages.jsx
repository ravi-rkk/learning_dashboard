import { useRef } from 'react';
import { T, FONTS } from '../tokens';

/** Normalize note.images: string | { url, caption? } | array */
export function normalizeImages(images) {
  if (!images) return [];
  const list = Array.isArray(images) ? images : [images];
  return list
    .map(item => {
      if (typeof item === 'string') return { url: item.trim(), caption: '' };
      if (item?.url) return { url: String(item.url).trim(), caption: item.caption || '' };
      return null;
    })
    .filter(Boolean);
}

function ImageFigure({ url, caption, onClick }) {
  return (
    <figure
      style={{
        margin: 0,
        borderRadius: 12,
        overflow: 'hidden',
        border: `1px solid ${T.border}`,
        background: T.surface2,
        cursor: onClick ? 'zoom-in' : 'default',
      }}
      onClick={onClick}
    >
      <img
        src={url}
        alt={caption || 'Reference'}
        loading="lazy"
        style={{
          display: 'block',
          width: '100%',
          maxHeight: 420,
          objectFit: 'contain',
          background: '#0a0c12',
        }}
        onError={e => {
          e.currentTarget.style.display = 'none';
          const err = e.currentTarget.parentElement?.querySelector('[data-img-err]');
          if (err) err.style.display = 'flex';
        }}
      />
      <div
        data-img-err
        style={{
          display: 'none',
          padding: 24,
          alignItems: 'center',
          justifyContent: 'center',
          color: T.dim,
          fontFamily: FONTS.mono,
          fontSize: 12,
          minHeight: 120,
        }}
      >
        Image failed to load — check URL
      </div>
      {caption && (
        <figcaption style={{
          padding: '10px 14px',
          fontFamily: FONTS.mono,
          fontSize: 11,
          color: T.muted,
          borderTop: `1px solid ${T.border}`,
          lineHeight: 1.5,
        }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/** Read-only gallery in note reader */
export function NoteImageGallery({ images, onImageClick }) {
  const list = normalizeImages(images);
  if (list.length === 0) return null;

  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{
        fontFamily: FONTS.mono,
        fontSize: 10,
        letterSpacing: '0.1em',
        color: T.dim,
        textTransform: 'uppercase',
        marginBottom: 12,
      }}>
        📷 Reference images
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: list.length === 1 ? '1fr' : 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: 14,
      }}>
        {list.map((img, i) => (
          <ImageFigure
            key={`${img.url}-${i}`}
            url={img.url}
            caption={img.caption}
            onClick={onImageClick ? () => onImageClick(img.url) : undefined}
          />
        ))}
      </div>
    </div>
  );
}

const inputStyle = {
  background: T.surface2,
  border: `1px solid ${T.border2}`,
  color: T.text,
  borderRadius: 6,
  padding: '8px 10px',
  fontSize: 13,
  outline: 'none',
  width: '100%',
  fontFamily: FONTS.body,
  boxSizing: 'border-box',
};

/** Edit images: URLs, captions, upload */
export function NoteImageEditor({ images, onChange }) {
  const fileRef = useRef(null);
  const list = normalizeImages(images);

  function updateAt(index, field, value) {
    const next = list.map((img, i) => (i === index ? { ...img, [field]: value } : img));
    onChange(next);
  }

  function removeAt(index) {
    onChange(list.filter((_, i) => i !== index));
  }

  function addUrl() {
    onChange([...list, { url: '', caption: '' }]);
  }

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      onChange([...list, { url: reader.result, caption: file.name }]);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  }

  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{
        fontFamily: FONTS.mono,
        fontSize: 10,
        letterSpacing: '0.1em',
        color: T.dim,
        textTransform: 'uppercase',
        marginBottom: 12,
      }}>
        📷 Reference images
      </div>
      <p style={{ fontSize: 12, color: T.muted, margin: '0 0 14px', lineHeight: 1.55 }}>
        Paste an image URL or upload from your device. Images appear above your notes when reading.
      </p>

      {list.map((img, i) => (
        <div
          key={i}
          style={{
            marginBottom: 14,
            padding: 14,
            borderRadius: 10,
            border: `1px solid ${T.border}`,
            background: T.surface,
          }}
        >
          {img.url && (
            <div style={{ marginBottom: 10, borderRadius: 8, overflow: 'hidden' }}>
              <img
                src={img.url}
                alt=""
                style={{ width: '100%', maxHeight: 160, objectFit: 'contain', background: '#0a0c12' }}
              />
            </div>
          )}
          <label style={{ display: 'block', fontFamily: FONTS.mono, fontSize: 10, color: T.dim, marginBottom: 4 }}>
            IMAGE URL (or /public/path)
          </label>
          <input
            value={img.url.startsWith('data:') ? '(uploaded file)' : img.url}
            readOnly={img.url.startsWith('data:')}
            placeholder="https://example.com/diagram.png"
            onChange={e => !img.url.startsWith('data:') && updateAt(i, 'url', e.target.value)}
            style={{ ...inputStyle, marginBottom: 8 }}
          />
          <label style={{ display: 'block', fontFamily: FONTS.mono, fontSize: 10, color: T.dim, marginBottom: 4 }}>
            CAPTION (optional)
          </label>
          <input
            value={img.caption}
            placeholder="What this diagram shows…"
            onChange={e => updateAt(i, 'caption', e.target.value)}
            style={{ ...inputStyle, marginBottom: 8 }}
          />
          <button
            type="button"
            onClick={() => removeAt(i)}
            style={{
              fontFamily: FONTS.mono, fontSize: 11, color: T.pink,
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            }}
          >
            Remove image
          </button>
        </div>
      ))}

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={addUrl}
          style={{
            fontFamily: FONTS.mono, fontSize: 11,
            padding: '8px 14px', borderRadius: 8,
            border: `1px solid ${T.border2}`,
            background: T.surface2, color: T.cyan, cursor: 'pointer',
          }}
        >
          + Add image URL
        </button>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          style={{
            fontFamily: FONTS.mono, fontSize: 11,
            padding: '8px 14px', borderRadius: 8,
            border: `1px solid rgba(0,212,255,0.35)`,
            background: 'rgba(0,212,255,0.08)', color: T.cyan, cursor: 'pointer',
          }}
        >
          📁 Upload image
        </button>
        <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleFile} />
      </div>
    </div>
  );
}

/** Lightbox for full-size view */
export function ImageLightbox({ url, onClose }) {
  if (!url) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(0,0,0,0.88)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
      }}
    >
      <button
        type="button"
        onClick={onClose}
        style={{
          position: 'absolute', top: 16, right: 16,
          background: T.surface2, border: `1px solid ${T.border}`,
          color: T.text, borderRadius: 8, padding: '8px 14px',
          fontFamily: FONTS.mono, fontSize: 12, cursor: 'pointer',
        }}
      >
        ✕ Close
      </button>
      <img
        src={url}
        alt="Reference full size"
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '100%',
          maxHeight: '90vh',
          objectFit: 'contain',
          borderRadius: 8,
        }}
      />
    </div>
  );
}
