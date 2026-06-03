import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STORE_SRC = path.resolve(__dirname, 'src/data/notes-store.json');
const STORE_PUBLIC = path.resolve(__dirname, 'public/notes-store.json');

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', c => chunks.push(c));
    req.on('end', () => {
      try {
        resolve(Buffer.concat(chunks).toString('utf8'));
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}

function writeNotesFile(data) {
  const json = JSON.stringify(data, null, 2);
  fs.mkdirSync(path.dirname(STORE_SRC), { recursive: true });
  fs.writeFileSync(STORE_SRC, json, 'utf8');
  fs.mkdirSync(path.dirname(STORE_PUBLIC), { recursive: true });
  fs.writeFileSync(STORE_PUBLIC, json, 'utf8');
}

export function notesApiPlugin() {
  return {
    name: 'devatlas-notes-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0];

        if (url === '/api/notes' && req.method === 'GET') {
          try {
            const file = fs.existsSync(STORE_SRC) ? STORE_SRC : STORE_PUBLIC;
            const raw = fs.readFileSync(file, 'utf8');
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Cache-Control', 'no-store');
            res.statusCode = 200;
            res.end(raw);
          } catch {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'notes-store.json not found' }));
          }
          return;
        }

        if (url === '/api/notes' && req.method === 'PUT') {
          try {
            const body = await readBody(req);
            const data = JSON.parse(body);
            writeNotesFile(data);
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify({ ok: true }));
          } catch (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: String(err.message || err) }));
          }
          return;
        }

        next();
      });
    },
  };
}
