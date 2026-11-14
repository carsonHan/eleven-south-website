import { cp, mkdir, rm } from 'node:fs/promises';

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
await cp('src', 'dist', { recursive: true });
for (const unit of [4, 5, 6]) await cp('src/unit-2/index.html', `dist/unit-${unit}/index.html`);
console.log('Built static site to dist/');
