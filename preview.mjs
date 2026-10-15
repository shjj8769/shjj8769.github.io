import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
};
const server = http.createServer(async (request, response) => {
  if (!['GET', 'HEAD'].includes(request.method)) {
    response.writeHead(405, { Allow: 'GET, HEAD' });
    return response.end();
  }
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const filename = path.resolve(root, `.${pathname === '/' ? '/index.html' : pathname}`);
    const relative = path.relative(root, filename);
    if (relative.startsWith('..') || path.isAbsolute(relative) || !mime[path.extname(filename).toLowerCase()]) {
      response.writeHead(404);
      return response.end('Not found');
    }
    const file = await readFile(filename);
    response.writeHead(200, {
      'Content-Type': mime[path.extname(filename).toLowerCase()],
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    });
    response.end(request.method === 'HEAD' ? undefined : file);
  } catch {
    response.writeHead(404);
    response.end('Not found');
  }
});

let port = Number(process.env.PORT || 4173);
if (!Number.isInteger(port) || port < 1024 || port > 65535) port = 4173;
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE' && port < 4190) {
    port += 1;
    server.listen(port, '127.0.0.1');
  } else {
    console.error(error.message);
    process.exitCode = 1;
  }
});
server.on('listening', () => console.log(`Local: http://127.0.0.1:${port}/\nStop: Ctrl+C`));
server.listen(port, '127.0.0.1');
