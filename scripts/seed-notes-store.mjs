import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const outSrc = path.join(root, 'src/data/notes-store.json');
const outPublic = path.join(root, 'public/notes-store.json');

const { DEFAULT_NOTES_V2 } = await import('../src/data/notesDefaults.js');

const json = JSON.stringify(DEFAULT_NOTES_V2, null, 2);

for (const out of [outSrc, outPublic]) {
  fs.mkdirSync(path.dirname(out), { recursive: true });
  if (!fs.existsSync(out)) {
    fs.writeFileSync(out, json, 'utf8');
    console.log('Created', out);
  } else {
    console.log('Already exists (skipped):', out);
  }
}
