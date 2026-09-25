// Renders index.html frame-by-frame with headless Chromium, then muxes the
// Ustadz's original audio with ffmpeg.
//   node render.js [--fps 30] [--workers 6] [--out output/doa-perlindungan-anak.mp4]
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { chromium } = require(process.env.PLAYWRIGHT_PATH || '/opt/node22/lib/node_modules/playwright');

const args = Object.fromEntries(process.argv.slice(2).reduce((a, v, i, arr) => (v.startsWith('--') ? a.concat([[v.slice(2), arr[i + 1]]]) : a), []));
const FPS = +(args.fps || 30);
const WORKERS = +(args.workers || 6);
const OUT = path.resolve(__dirname, args.out || 'output/doa-perlindungan-anak.mp4');
const AUDIO = path.resolve(__dirname, 'assets/audio/ceramah-ustadz-abdullah-azzam.m4a');
const FRAMES = path.resolve(args.frames || path.join(require('os').tmpdir(), 'doa-frames'));

(async () => {
  fs.rmSync(FRAMES, { recursive: true, force: true });
  fs.mkdirSync(FRAMES, { recursive: true });
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  const browser = await chromium.launch();
  const url = 'file://' + path.resolve(__dirname, 'index.html');
  const probe = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  await probe.goto(url);
  await probe.waitForFunction(() => window.__ready === true);
  const duration = await probe.evaluate(() => window.DURATION);
  await probe.close();
  const total = Math.round(duration * FPS);
  console.log(`duration ${duration}s -> ${total} frames @${FPS}fps, ${WORKERS} workers`);
  let done = 0;
  const t0 = Date.now();
  await Promise.all(Array.from({ length: WORKERS }, async (_, w) => {
    const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
    page.on('pageerror', (e) => console.error('[pageerror]', e.message));
    await page.goto(url);
    await page.waitForFunction(() => window.__ready === true);
    // contiguous chunk per worker keeps the per-page subtitle cache warm
    const per = Math.ceil(total / WORKERS);
    for (let f = w * per; f < Math.min(total, (w + 1) * per); f++) {
      await page.evaluate((t) => window.renderAt(t), f / FPS);
      await page.screenshot({ path: path.join(FRAMES, `f_${String(f).padStart(5, '0')}.jpg`), type: 'jpeg', quality: 95 });
      if (++done % 150 === 0) console.log(`  ${done}/${total}  (${((Date.now() - t0) / 1000).toFixed(0)}s)`);
    }
    await page.close();
  }));
  await browser.close();
  console.log('encoding...');
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-framerate', String(FPS), '-i', path.join(FRAMES, 'f_%05d.jpg'),
    '-i', AUDIO, '-map', '0:v', '-map', '1:a',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '17', '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-movflags', '+faststart',
    '-c:a', 'aac', '-b:a', '192k', '-ar', '44100', '-t', String(total / FPS), OUT], { stdio: 'inherit' });
  console.log('wrote', OUT);
})();
