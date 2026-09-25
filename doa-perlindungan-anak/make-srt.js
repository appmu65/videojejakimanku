// Writes output/subtitle.srt from the SUBS table in index.html
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const SUBS = eval(html.match(/const SUBS = (\[[\s\S]*?\n\]);/)[1]);
const ts = (s) => {
  const ms = Math.round(s * 1000);
  const p = (n, w = 2) => String(n).padStart(w, '0');
  return `${p(Math.floor(ms / 3600000))}:${p(Math.floor(ms / 60000) % 60)}:${p(Math.floor(ms / 1000) % 60)},${p(ms % 1000, 3)}`;
};
const srt = SUBS.map((s, i) => `${i + 1}\n${ts(s.a)} --> ${ts(s.b)}\n${s.w.map((w) => w[0]).join(' ').replace('bikalimātillāhit- tāmmah', 'bikalimātillāhit-tāmmah')}\n`).join('\n');
fs.writeFileSync(path.join(__dirname, 'output/subtitle.srt'), srt);
console.log(srt);
