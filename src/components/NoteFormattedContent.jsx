import { T, FONTS } from '../tokens';

const HEADING = "'Clash Display', 'Outfit', sans-serif";

const COLOR_MAP = {
  cyan:   T.cyan,
  green:  T.green,
  yellow: T.yellow,
  pink:   T.pink,
  purple: T.purple,
  orange: T.orange,
};

function parseColorTags(text) {
  const parts = [];
  const re = /\[(cyan|green|yellow|pink|purple|orange)\]([\s\S]*?)\[\/\1\]/gi;
  let last = 0;
  let m;
  const str = text;
  const regex = new RegExp(re.source, re.flags);
  while ((m = regex.exec(str)) !== null) {
    if (m.index > last) parts.push({ type: 'plain', text: str.slice(last, m.index) });
    parts.push({ type: 'color', color: m[1].toLowerCase(), text: m[2] });
    last = m.index + m[0].length;
  }
  if (last < str.length) parts.push({ type: 'plain', text: str.slice(last) });
  return parts.length ? parts : [{ type: 'plain', text }];
}

function renderInline(text, keyPrefix = '') {
  if (!text) return null;
  const segments = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let m;
  let i = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) {
      segments.push(...parseColorTags(text.slice(last, m.index)).map((p, j) => (
        <ColorPlain key={`${keyPrefix}-p-${i++}-${j}`} part={p} />
      )));
    }
    const token = m[0];
    if (token.startsWith('**')) {
      segments.push(
        <strong key={`${keyPrefix}-b-${i++}`} style={{ color: T.text, fontWeight: 700 }}>
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('*')) {
      segments.push(<em key={`${keyPrefix}-i-${i++}`}>{token.slice(1, -1)}</em>);
    } else if (token.startsWith('`')) {
      segments.push(
        <code key={`${keyPrefix}-c-${i++}`} style={{
          fontFamily: FONTS.mono, fontSize: '0.9em',
          background: T.surface3, padding: '2px 6px', borderRadius: 4,
          color: T.cyan, border: `1px solid ${T.border}`,
        }}>
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith('[')) {
      const lm = token.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (lm) {
        segments.push(
          <a key={`${keyPrefix}-a-${i++}`} href={lm[2]} target="_blank" rel="noreferrer"
            style={{ color: T.cyan, textDecoration: 'underline' }}>
            {lm[1]}
          </a>
        );
      }
    }
    last = m.index + token.length;
  }
  if (last < text.length) {
    segments.push(...parseColorTags(text.slice(last)).map((p, j) => (
      <ColorPlain key={`${keyPrefix}-e-${i++}-${j}`} part={p} />
    )));
  }
  return segments.length ? segments : parseColorTags(text).map((p, j) => (
    <ColorPlain key={`${keyPrefix}-f-${j}`} part={p} />
  ));
}

function ColorPlain({ part }) {
  if (part.type === 'color') {
    return (
      <span style={{ color: COLOR_MAP[part.color] || T.cyan, fontWeight: 600 }}>
        {renderInline(part.text, 'nested')}
      </span>
    );
  }
  return <>{part.text}</>;
}

function Block({ type, children, line }) {
  if (type === 'h1') {
    return (
      <h2 style={{
        fontFamily: HEADING, fontSize: 28, fontWeight: 800, color: T.cyan,
        margin: '28px 0 12px', lineHeight: 1.25, letterSpacing: '-0.02em',
      }}>
        {children}
      </h2>
    );
  }
  if (type === 'h2') {
    return (
      <h3 style={{
        fontFamily: HEADING, fontSize: 22, fontWeight: 700, color: T.green,
        margin: '22px 0 10px', lineHeight: 1.3,
      }}>
        {children}
      </h3>
    );
  }
  if (type === 'h3') {
    return (
      <h4 style={{
        fontFamily: HEADING, fontSize: 18, fontWeight: 700, color: T.yellow,
        margin: '18px 0 8px', lineHeight: 1.35,
      }}>
        {children}
      </h4>
    );
  }
  if (type === 'hr') {
    return <hr style={{ border: 'none', borderTop: `1px solid ${T.border2}`, margin: '24px 0' }} />;
  }
  if (type === 'quote') {
    return (
      <blockquote style={{
        margin: '12px 0', padding: '12px 18px',
        borderLeft: `3px solid ${T.cyan}`,
        background: 'rgba(0,212,255,0.06)',
        borderRadius: '0 8px 8px 0',
        color: T.muted,
      }}>
        {children}
      </blockquote>
    );
  }
  if (type === 'ul') {
    return (
      <ul style={{ margin: '10px 0', paddingLeft: 22, color: T.text }}>
        {line}
      </ul>
    );
  }
  if (type === 'code') {
    return (
      <pre style={{
        background: T.surface3, border: `1px solid ${T.border}`,
        borderRadius: 10, padding: 16, overflow: 'auto',
        fontFamily: FONTS.mono, fontSize: 13, lineHeight: 1.6, color: T.text,
        margin: '14px 0',
      }}>
        <code>{children}</code>
      </pre>
    );
  }
  return (
    <p style={{ margin: '0 0 14px', lineHeight: 1.85, color: T.text }}>
      {children}
    </p>
  );
}

function parseBlocks(content) {
  const lines = content.split('\n');
  const blocks = [];
  let i = 0;
  let codeBuf = null;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim().startsWith('```')) {
      if (codeBuf === null) {
        codeBuf = [];
        i += 1;
        continue;
      }
      blocks.push({ type: 'code', text: codeBuf.join('\n') });
      codeBuf = null;
      i += 1;
      continue;
    }

    if (codeBuf !== null) {
      codeBuf.push(line);
      i += 1;
      continue;
    }

    if (/^---+$/.test(line.trim())) {
      blocks.push({ type: 'hr' });
      i += 1;
      continue;
    }

    if (/^###\s+/.test(line)) {
      blocks.push({ type: 'h3', text: line.replace(/^###\s+/, '') });
      i += 1;
      continue;
    }
    if (/^##\s+/.test(line)) {
      blocks.push({ type: 'h2', text: line.replace(/^##\s+/, '') });
      i += 1;
      continue;
    }
    if (/^#\s+/.test(line)) {
      blocks.push({ type: 'h1', text: line.replace(/^#\s+/, '') });
      i += 1;
      continue;
    }

    if (/^>\s?/.test(line)) {
      const quoteLines = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        quoteLines.push(lines[i].replace(/^>\s?/, ''));
        i += 1;
      }
      blocks.push({ type: 'quote', text: quoteLines.join('\n') });
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
        items.push(
          <li key={i} style={{ marginBottom: 6 }}>
            {renderInline(lines[i].replace(/^[-*]\s+/, ''))}
          </li>
        );
        i += 1;
      }
      blocks.push({ type: 'ul', items });
      continue;
    }

    if (line.trim() === '') {
      i += 1;
      continue;
    }

    const para = [];
    while (i < lines.length && lines[i].trim() !== '' && !/^#{1,3}\s/.test(lines[i])
      && !/^[-*]\s+/.test(lines[i]) && !/^>\s?/.test(lines[i])
      && !lines[i].trim().startsWith('```') && !/^---+$/.test(lines[i].trim())) {
      para.push(lines[i]);
      i += 1;
    }
    if (para.length) blocks.push({ type: 'p', text: para.join('\n') });
  }

  if (codeBuf?.length) blocks.push({ type: 'code', text: codeBuf.join('\n') });
  return blocks;
}

export default function NoteFormattedContent({ content }) {
  if (!content?.trim()) {
    return (
      <span style={{ color: T.dim, fontStyle: 'italic' }}>
        No notes written yet. Click &ldquo;Edit Notes&rdquo; to add content.
      </span>
    );
  }

  const blocks = parseBlocks(content);

  return (
    <div className="note-prose" style={{ fontFamily: FONTS.body, fontSize: 16 }}>
      {blocks.map((block, idx) => {
        if (block.type === 'ul') {
          return <Block key={idx} type="ul" line={block.items} />;
        }
        if (block.type === 'code') {
          return <Block key={idx} type="code">{block.text}</Block>;
        }
        return (
          <Block key={idx} type={block.type}>
            {renderInline(block.text)}
          </Block>
        );
      })}
    </div>
  );
}
