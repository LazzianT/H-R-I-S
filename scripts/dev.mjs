// Runs backend + frontend + agent-monitor in parallel with prefixed output.
// No dependencies (Node builtins only). Ctrl+C stops all.
import { spawn } from 'node:child_process';

const RESET = '\x1b[0m';
const SERVICES = [
  { name: 'backend', color: '\x1b[36m', cmd: 'npm --prefix backend run dev' },
  { name: 'frontend', color: '\x1b[35m', cmd: 'npm --prefix frontend run dev' },
  { name: 'monitor', color: '\x1b[32m', cmd: 'npm --prefix agent-monitor run dev' },
  { name: 'opencode', color: '\x1b[33m', cmd: 'opencode serve --port 4180 --cors http://localhost:5180' },
];

const children = [];

const UI_ONLY = process.argv.includes('--ui-only');
const selected = UI_ONLY ? SERVICES.filter((s) => s.name !== 'opencode') : SERVICES;

for (const svc of selected) {
  // shell:true + a single command string: works on Windows (Node >=20 blocks
  // spawning .cmd without a shell) and avoids the DEP0190 args-escaping warning.
  const child = spawn(svc.cmd, { stdio: ['ignore', 'pipe', 'pipe'], shell: true });
  const tag = `${svc.color}[${svc.name}]${RESET} `;
  const pipe = (stream) =>
    stream.on('data', (d) => {
      String(d)
        .split(/\r?\n/)
        .filter((l) => l.trim())
        .forEach((l) => console.log(tag + l));
    });
  pipe(child.stdout);
  pipe(child.stderr);
  child.on('exit', (code) => console.log(`${tag}exited (${code})`));
  children.push(child);
}

function stopAll() {
  for (const c of children) {
    if (c.exitCode !== null) continue;
    if (process.platform === 'win32') {
      spawn('taskkill', ['/pid', String(c.pid), '/T', '/F'], { stdio: 'ignore' });
    } else {
      try {
        c.kill();
      } catch {
        /* ignore */
      }
    }
  }
}

process.on('SIGINT', () => {
  stopAll();
  process.exit(0);
});
process.on('SIGTERM', () => {
  stopAll();
  process.exit(0);
});
