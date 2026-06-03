import { T, FONTS } from '../tokens';
import { buildTableMarkdown, insertAtCursor, appendTableRow } from '../utils/noteMarkdown';
import { normalizeNoteContent } from '../utils/noteContentNormalize';

const COLORS = [
  { id: 'cyan',   label: 'Cyan',   color: T.cyan },
  { id: 'green',  label: 'Green',  color: T.green },
  { id: 'yellow', label: 'Yellow', color: T.yellow },
  { id: 'pink',   label: 'Pink',   color: T.pink },
  { id: 'purple', label: 'Purple', color: T.purple },
  { id: 'orange', label: 'Orange', color: T.orange },
];

function getLineBounds(text, pos) {
  const start = text.lastIndexOf('\n', pos - 1) + 1;
  const next = text.indexOf('\n', pos);
  const end = next === -1 ? text.length : next;
  return { start, end, line: text.slice(start, end) };
}

/** Insert or wrap text at cursor in textarea */
export function applyFormat(textarea, action) {
  if (!textarea) return;
  const { value, selectionStart: start, selectionEnd: end } = textarea;
  const selected = value.slice(start, end);
  let newValue = value;
  let newStart = start;
  let newEnd = end;

  const wrap = (before, after, placeholder = 'text') => {
    const inner = selected || placeholder;
    newValue = value.slice(0, start) + before + inner + after + value.slice(end);
    newStart = start + before.length;
    newEnd = newStart + inner.length;
  };

  const linePrefix = (prefix) => {
    const { start: ls, end: le, line } = getLineBounds(value, start);
    const body = line
      .replace(/^#{1,4}\s+/, '')
      .replace(/^>\s+/, '')
      .replace(/^[-*]\s+/, '')
      .replace(/^\d+\.\s+/, '');
    const newLine = prefix + body;
    newValue = value.slice(0, ls) + newLine + value.slice(le);
    newStart = ls;
    newEnd = ls + newLine.length;
  };

  switch (action) {
    case 'bold':
      wrap('**', '**', 'bold text');
      break;
    case 'italic':
      wrap('*', '*', 'italic');
      break;
    case 'code':
      wrap('`', '`', 'code');
      break;
    case 'link':
      wrap('[', '](https://)', 'link text');
      break;
    case 'h1':
      linePrefix('# ');
      break;
    case 'h2':
      linePrefix('## ');
      break;
    case 'h3':
      linePrefix('### ');
      break;
    case 'h4':
      linePrefix('#### ');
      break;
    case 'ul':
      linePrefix('- ');
      break;
    case 'ol':
      linePrefix('1. ');
      break;
    case 'table3':
      return insertAtCursor(textarea, buildTableMarkdown(3, 3).trim());
    case 'table4':
      return insertAtCursor(textarea, buildTableMarkdown(4, 3).trim());
    case 'tableRow':
      return appendTableRow(textarea);
    case 'quote':
      linePrefix('> ');
      break;
    case 'divider':
      newValue = `${value.slice(0, start)}\n\n---\n\n${value.slice(end)}`;
      newStart = start + 5;
      newEnd = newStart;
      break;
    default:
      if (action.startsWith('color:')) {
        const id = action.slice(6);
        wrap(`[${id}]`, `[/${id}]`, 'colored text');
      }
      break;
  }

  return { newValue, newStart, newEnd };
}

function ToolBtn({ title, onClick, children, accent }) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      style={{
        fontFamily: FONTS.mono,
        fontSize: 11,
        padding: '6px 10px',
        borderRadius: 6,
        border: `1px solid ${accent ? accent + '55' : T.border}`,
        background: accent ? `${accent}14` : T.surface3,
        color: accent || T.text,
        cursor: 'pointer',
        fontWeight: accent ? 700 : 500,
        transition: 'all 0.12s',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </button>
  );
}

export default function NoteFormatToolbar({ textareaRef, onChange }) {
  function run(action) {
    const el = textareaRef.current;
    if (!el) return;
    const result = applyFormat(el, action);
    if (!result) return;
    onChange(result.newValue);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(result.newStart, result.newEnd);
    });
  }

  function runAutoFormat() {
    const el = textareaRef.current;
    if (!el) return;
    onChange(normalizeNoteContent(el.value));
    requestAnimationFrame(() => el.focus());
  }

  return (
    <div style={{
      background: T.surface2,
      border: `1px solid ${T.border}`,
      borderRadius: '12px 12px 0 0',
      borderBottom: 'none',
      padding: '10px 12px',
    }}>
      <div style={{
        fontFamily: FONTS.mono, fontSize: 10, color: T.dim,
        letterSpacing: '0.08em', marginBottom: 8,
      }}>
        FORMAT — select text, then click (or click for placeholders)
      </div>

      <div className="flex flex-wrap gap-[6px] mb-2">
        <ToolBtn title="Heading 1 (cyan)" accent={T.cyan} onClick={() => run('h1')}>H1</ToolBtn>
        <ToolBtn title="Heading 2 (green)" accent={T.green} onClick={() => run('h2')}>H2</ToolBtn>
        <ToolBtn title="Heading 3 (yellow)" accent={T.yellow} onClick={() => run('h3')}>H3</ToolBtn>
        <ToolBtn title="Heading 4 (purple)" accent={T.purple} onClick={() => run('h4')}>H4</ToolBtn>
        <ToolBtn title="Bold" onClick={() => run('bold')}>𝐁 Bold</ToolBtn>
        <ToolBtn title="Italic" onClick={() => run('italic')}>𝐼 Italic</ToolBtn>
        <ToolBtn title="Inline code" onClick={() => run('code')}>{'`'} Code</ToolBtn>
        <ToolBtn title="Bullet list" onClick={() => run('ul')}>• List</ToolBtn>
        <ToolBtn title="Numbered list" onClick={() => run('ol')}>1. List</ToolBtn>
        <ToolBtn title="Quote" onClick={() => run('quote')}>❝ Quote</ToolBtn>
        <ToolBtn title="Insert 3-column table" accent={T.cyan} onClick={() => run('table3')}>⊞ Table</ToolBtn>
        <ToolBtn title="Insert 4-column table" accent={T.cyan} onClick={() => run('table4')}>⊞ 4-col</ToolBtn>
        <ToolBtn title="Add table row at cursor" accent={T.green} onClick={() => run('tableRow')}>+ Row</ToolBtn>
        <ToolBtn title="Link" onClick={() => run('link')}>🔗 Link</ToolBtn>
        <ToolBtn title="Auto-format plain text into headings and lists" accent={T.yellow} onClick={runAutoFormat}>
          ✨ Format
        </ToolBtn>
        <ToolBtn title="Divider line" onClick={() => run('divider')}>— Line</ToolBtn>
      </div>

      <div className="flex flex-wrap gap-[6px] items-center">
        <span style={{ fontFamily: FONTS.mono, fontSize: 10, color: T.dim, marginRight: 4 }}>Color:</span>
        {COLORS.map(({ id, label, color }) => (
          <ToolBtn key={id} title={`${label} text`} accent={color} onClick={() => run(`color:${id}`)}>
            Aa
          </ToolBtn>
        ))}
      </div>
    </div>
  );
}
