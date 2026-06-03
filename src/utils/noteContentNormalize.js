/**
 * Converts plain study-note text into structured markdown before render.
 * Handles "Title: description" lines, inline " - **Item:**" bullets, and short section titles.
 */

const SECTION_TITLE = /^[A-Z][A-Za-z0-9\s&'()/\-]{2,48}$/;
const LABEL_LINE = /^([A-Z][A-Za-z0-9\s()/\-']{2,72}):\s*(.+)$/;
const DUPLICATE_TOPIC = /^(what is|why|how|what are|what's)\s/i;

function isSectionTitle(line) {
  const t = line.trim();
  if (!t || t.includes('|') || t.startsWith('#')) return false;
  if (t.endsWith(':') || t.endsWith(':-')) return false;
  if (!SECTION_TITLE.test(t)) return false;
  const words = t.split(/\s+/);
  if (words.length > 6) return false;
  return words.every(w => /^[A-Z(\[]/.test(w) || ['and', 'of', 'the', 'in', 'for', 'to', 'vs'].includes(w.toLowerCase()));
}

function splitInlineBullets(line) {
  if (!/\s-\s+(?=\*\*[A-Z]|\*\*[A-Za-z])/.test(line) && !/\s-\s+[A-Z][a-z]+/.test(line)) {
    return [line];
  }
  const parts = line.split(/\s+-\s+(?=\*\*)/);
  if (parts.length <= 1) {
    const parts2 = line.split(/\s+-\s+(?=[A-Z])/);
    if (parts2.length <= 1) return [line];
    const [head, ...tail] = parts2;
    return [head.trim(), ...tail.map(t => `- ${t.trim()}`)].filter(Boolean);
  }
  const [head, ...tail] = parts;
  return [head.trim(), ...tail.map(t => `- ${t.trim()}`)].filter(Boolean);
}

function toBullet(label, body) {
  const L = label.trim();
  const B = body.trim();
  if (L.startsWith('**') && L.endsWith('**')) return `- ${L}: ${B}`;
  return `- **${L}:** ${B}`;
}

export function normalizeNoteContent(content) {
  if (!content?.trim()) return content;

  const rawLines = content.replace(/\r\n/g, '\n').split('\n');
  const expanded = [];
  rawLines.forEach(line => {
    splitInlineBullets(line).forEach(l => expanded.push(l));
  });

  const out = [];
  let skippedTopicLine = false;

  for (let i = 0; i < expanded.length; i++) {
    let line = expanded[i];
    const trimmed = line.trim();

    if (!trimmed) {
      out.push('');
      continue;
    }

    if (!skippedTopicLine && DUPLICATE_TOPIC.test(trimmed) && trimmed.length < 120) {
      skippedTopicLine = true;
      continue;
    }

    if (trimmed.startsWith('#') || trimmed.startsWith('|') || trimmed.startsWith('```')) {
      out.push(line);
      continue;
    }

    if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || /^\d+\.\s+/.test(trimmed)) {
      out.push(line);
      continue;
    }

    if (trimmed.endsWith(':-')) {
      out.push(`## ${trimmed.slice(0, -2).trim()}`);
      continue;
    }

    if (isSectionTitle(trimmed)) {
      out.push(`## ${trimmed}`);
      continue;
    }

    const labelMatch = trimmed.match(LABEL_LINE);
    if (labelMatch) {
      const [, label, body] = labelMatch;
      if (body.length >= 8) {
        out.push(toBullet(label, body));
        continue;
      }
    }

    if (/^\*\*[^*]+\*\*\s*:?\s*$/.test(trimmed)) {
      out.push(trimmed);
      continue;
    }

    out.push(line);
  }

  return out.join('\n').replace(/\n{3,}/g, '\n\n');
}
