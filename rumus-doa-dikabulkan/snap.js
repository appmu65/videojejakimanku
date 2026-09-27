// Render selected timestamps to PNG for review:  node snap.js out_dir t1 t2 ...
const path = require('path');
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => {
  const [out, ...ts] = process.argv.slice(2);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  page.on('console', m => console.log('[page]', m.text()));
  page.on('pageerror', e => console.log('[pageerror]', e.message));
  await page.goto('file://' + path.resolve(__dirname, 'index.html'));
  await page.waitForFunction(() => window.__ready === true, null, { timeout: 30000 });
  for (const t of ts) {
    await page.evaluate((t) => window.renderAt(t), parseFloat(t));
    await page.screenshot({ path: `${out}/t_${String(t).padStart(5, '0')}.png` });
  }
  await browser.close();
})();
