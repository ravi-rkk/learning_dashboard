/** Shared markdown helpers for note editor + renderer */

export function isTableRow(line) {
  const t = line.trim();
  return t.startsWith('|') && t.endsWith('|') && t.includes('|');
}

export function isTableSeparator(line) {
  const t = line.trim();
  if (!isTableRow(line)) return false;
  return /^\|[\s\-:|]+\|$/.test(t);
}

export function parseTableRow(line) {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map(c => c.trim());
}

export function buildTableMarkdown(cols = 3, dataRows = 2) {
  const headers = Array.from({ length: cols }, (_, i) => `Column ${i + 1}`);
  const headerLine = `| ${headers.join(' | ')} |`;
  const sepLine = `| ${headers.map(() => '---').join(' | ')} |`;
  const rows = Array.from({ length: dataRows }, (_, r) =>
    `| ${Array.from({ length: cols }, (_, c) => `Row ${r + 1} col ${c + 1}`).join(' | ')} |`
  );
  return `\n${headerLine}\n${sepLine}\n${rows.join('\n')}\n`;
}

export function insertAtCursor(textarea, text) {
  const { value, selectionStart: start, selectionEnd: end } = textarea;
  const needsGap = start > 0 && value[start - 1] !== '\n';
  const prefix = needsGap ? '\n\n' : '\n';
  const insert = prefix + text + '\n';
  const newValue = value.slice(0, start) + insert + value.slice(end);
  const newPos = start + insert.length;
  return { newValue, newStart: newPos, newEnd: newPos };
}

/** Append a row to the markdown table containing the cursor */
export function appendTableRow(textarea) {
  const { value, selectionStart: pos } = textarea;
  const lines = value.split('\n');
  let lineIdx = 0;
  let charCount = 0;
  for (let i = 0; i < lines.length; i++) {
    const next = charCount + lines[i].length + 1;
    if (pos <= next) {
      lineIdx = i;
      break;
    }
    charCount = next;
  }

  let tableStart = lineIdx;
  let tableEnd = lineIdx;
  while (tableStart > 0 && isTableRow(lines[tableStart - 1])) tableStart -= 1;
  while (tableEnd < lines.length - 1 && isTableRow(lines[tableEnd + 1])) tableEnd += 1;

  if (!isTableRow(lines[lineIdx])) {
    return insertAtCursor(textarea, buildTableMarkdown(3, 2).trim());
  }

  const dataLines = lines.slice(tableStart, tableEnd + 1).filter(l => isTableRow(l) && !isTableSeparator(l));
  const colCount = dataLines.length ? parseTableRow(dataLines[0]).length : 3;
  const emptyCells = Array.from({ length: colCount }, () => ' ');
  const newRow = `| ${emptyCells.join(' | ')} |`;

  const insertAfter = tableEnd;
  const newLines = [...lines.slice(0, insertAfter + 1), newRow, ...lines.slice(insertAfter + 1)];
  const newValue = newLines.join('\n');
  const insertPos = lines.slice(0, insertAfter + 1).join('\n').length + 1 + newRow.length;
  return { newValue, newStart: insertPos, newEnd: insertPos };
}
