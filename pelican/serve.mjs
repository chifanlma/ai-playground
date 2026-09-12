import http from 'http';
import { readFileSync } from 'fs';
import { extname, join, resolve, sep } from 'path';

const root = resolve('D:/zcode/pelican');
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.js': 'text/javascript; charset=utf-8',
};

http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (p === '/') p = '/pelican.html';
  const f = resolve(root, '.' + p);
  if (f !== root && !f.startsWith(root + sep)) {
    res.writeHead(403); res.end('forbidden'); return;
  }
  try {
    res.writeHead(200, { 'Content-Type': mime[extname(f).toLowerCase()] || 'application/octet-stream' });
    res.end(readFileSync(f));
  } catch {
    res.writeHead(404); res.end('not found');
  }
}).listen(8787, '127.0.0.1', () => console.log('serving http://127.0.0.1:8787/pelican.html'));
