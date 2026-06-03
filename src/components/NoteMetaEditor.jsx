import { T, FONTS } from '../tokens';

const HEADING = "'Clash Display', 'Outfit', sans-serif";

const fieldStyle = {
  width: '100%',
  background: T.surface,
  border: `1px solid ${T.border2}`,
  borderRadius: 10,
  color: T.text,
  padding: '12px 14px',
  fontFamily: FONTS.body,
  fontSize: 15,
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.15s',
};

const labelStyle = {
  fontFamily: FONTS.mono,
  fontSize: 10,
  color: T.muted,
  letterSpacing: '0.1em',
  display: 'block',
  marginBottom: 6,
};

export default function NoteMetaEditor({
  topic,
  preview,
  tags,
  status,
  onTopicChange,
  onPreviewChange,
  onTagsChange,
  onStatusChange,
}) {
  return (
    <div style={{
      background: T.surface,
      border: `1px solid ${T.border}`,
      borderRadius: 14,
      padding: '20px 22px',
      marginBottom: 24,
    }}>
      <div style={{
        fontFamily: FONTS.mono, fontSize: 10, color: T.cyan,
        letterSpacing: '0.12em', marginBottom: 16,
      }}>
        NOTE DETAILS — title, summary & tags
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>MAIN TITLE (shown at top of page)</label>
        <input
          value={topic}
          onChange={e => onTopicChange(e.target.value)}
          placeholder="e.g. What is React?"
          style={{ ...fieldStyle, fontFamily: HEADING, fontSize: 22, fontWeight: 700 }}
          onFocus={e => (e.target.style.borderColor = T.cyan)}
          onBlur={e => (e.target.style.borderColor = T.border2)}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>SHORT SUMMARY (subtitle under title)</label>
        <textarea
          value={preview}
          onChange={e => onPreviewChange(e.target.value)}
          placeholder="One or two lines shown below the title when reading…"
          rows={2}
          style={{ ...fieldStyle, resize: 'vertical', lineHeight: 1.55 }}
          onFocus={e => (e.target.style.borderColor = T.cyan)}
          onBlur={e => (e.target.style.borderColor = T.border2)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label style={labelStyle}>TAGS (comma separated)</label>
          <input
            value={tags}
            onChange={e => onTagsChange(e.target.value)}
            placeholder="React, Hooks, SPA"
            style={fieldStyle}
            onFocus={e => (e.target.style.borderColor = T.cyan)}
            onBlur={e => (e.target.style.borderColor = T.border2)}
          />
        </div>
        <div>
          <label style={labelStyle}>STATUS</label>
          <select
            value={status}
            onChange={e => onStatusChange(e.target.value)}
            style={{ ...fieldStyle, cursor: 'pointer', appearance: 'none' }}
            onFocus={e => (e.target.style.borderColor = T.cyan)}
            onBlur={e => (e.target.style.borderColor = T.border2)}
          >
            <option value="Complete">Complete</option>
            <option value="In Progress">In Progress</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      <p style={{
        fontFamily: FONTS.mono, fontSize: 11, color: T.dim,
        margin: '14px 0 0', lineHeight: 1.5,
      }}>
        Tip: Use # H1, ## H2, ### H3 in the body below for sections. Use the Table button to add comparison tables.
      </p>
    </div>
  );
}
