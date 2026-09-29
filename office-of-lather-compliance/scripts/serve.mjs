// Local stand-in for the Netlify catch-all: every path gets dist/index.html, status 403, _headers.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';

const dist = new URL('../dist/', import.meta.url);
const html = await readFile(new URL('index.html', dist));
const headers = Object.fromEntries((await readFile(new URL('_headers', dist), 'utf8'))
  .split(/\r?\n/).slice(1).map((l) => l.trim()).filter(Boolean)
  .map((l) => [l.slice(0, l.indexOf(':')), l.slice(l.indexOf(':') + 1).trim()]));
const port = Number(process.env.PORT ?? 4317);

createServer((req, res) => {
  res.writeHead(403, { ...headers, 'Content-Type': 'text/html; charset=utf-8' });
  res.end(req.method === 'HEAD' ? undefined : html);
}).listen(port, '127.0.0.1');
