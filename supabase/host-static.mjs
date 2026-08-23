/* host-static.mjs — wgrywa całą apkę ¡Vamos! do publicznego bucketa Supabase Storage.
   Ustawia POPRAWNE typy MIME (bez tego przeglądarka odrzuci moduły ES i service worker).

   Użycie (PowerShell, w katalogu projektu):
     $env:SUPABASE_URL="https://<PROJECT_REF>.supabase.co"
     $env:SUPABASE_SERVICE_KEY="<service_role_key_Marcela>"
     node supabase/host-static.mjs
   Po zakończeniu skrypt wypisze publiczny URL apki (do zainstalowania na telefonie).
   UWAGA: service_role key to sekret — trzymaj w ENV, nie commituj.                    */

import { readFile, readdir, stat } from 'node:fs/promises';
import { join, relative, sep, extname } from 'node:path';

const URLBASE = process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_KEY;
const BUCKET = process.env.BUCKET || 'vamos';
const ROOT = process.cwd();

if (!URLBASE || !KEY) {
  console.error('Ustaw SUPABASE_URL i SUPABASE_SERVICE_KEY w ENV.');
  process.exit(1);
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

// Które ścieżki wgrywamy (pomijamy .git, supabase/, README itp.)
const INCLUDE_DIRS = ['css', 'js', 'data', 'icons'];
const INCLUDE_FILES = ['index.html', 'manifest.json', 'sw.js'];

async function walk(dir) {
  const out = [];
  for (const name of await readdir(dir)) {
    const p = join(dir, name);
    const s = await stat(p);
    if (s.isDirectory()) out.push(...await walk(p));
    else out.push(p);
  }
  return out;
}

async function ensureBucket() {
  const res = await fetch(`${URLBASE}/storage/v1/bucket`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${KEY}`, apikey: KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: BUCKET, name: BUCKET, public: true }),
  });
  if (res.ok) console.log(`Bucket "${BUCKET}" utworzony (public).`);
  else console.log(`Bucket "${BUCKET}": ${res.status} (prawdopodobnie już istnieje).`);
}

async function upload(path) {
  const rel = relative(ROOT, path).split(sep).join('/');
  const mime = MIME[extname(path).toLowerCase()] || 'application/octet-stream';
  const body = await readFile(path);
  const res = await fetch(`${URLBASE}/storage/v1/object/${BUCKET}/${rel}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${KEY}`, apikey: KEY, 'Content-Type': mime, 'x-upsert': 'true' },
    body,
  });
  console.log(`${res.ok ? 'OK ' : 'ERR'} ${rel} (${mime})${res.ok ? '' : ' -> ' + await res.text()}`);
}

const files = [
  ...INCLUDE_FILES.map((f) => join(ROOT, f)),
  ...(await Promise.all(INCLUDE_DIRS.map((d) => walk(join(ROOT, d))))).flat(),
];

await ensureBucket();
for (const f of files) await upload(f);
console.log('\n✅ Gotowe. Apka Marcela:');
console.log(`${URLBASE}/storage/v1/object/public/${BUCKET}/index.html`);
