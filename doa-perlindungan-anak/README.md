# Doa Perlindungan untuk Anak — Animated Video

Video animasi vertikal (1080×1920, 30 fps, 48,5 detik) dari potongan kajian
**Ustadz Abdullah Azzam**. Suaranya diambil dari video asli, sedangkan semua
visualnya dibuat ulang sebagai animasi. Credit: **@jejakiman.ku**.

| File | Isi |
| --- | --- |
| `output/doa-perlindungan-anak.mp4` | Video final (H.264 + AAC 192 kbps) |
| `output/cover.jpg` | Cover / thumbnail (frame hook tanpa subtitle) |
| `output/subtitle.srt` | Subtitle ucapan Ustadz, sudah bertimestamp |
| `index.html` | Sumber animasi (HTML/SVG/Canvas, dirender per frame) |
| `render.js` | Merender `index.html` per frame lalu menggabungkannya dengan audio |
| `snap.js` | Merender detik tertentu menjadi PNG untuk dicek |
| `make-srt.js` | Membuat `subtitle.srt` dari tabel subtitle di `index.html` |
| `assets/audio/` | Audio asli ceramah (tanpa diubah) |
| `assets/fonts/` | Poppins, Amiri, Aref Ruqaa (lisensi SIL OFL, file lisensi ikut disertakan) |

## Teks doa (sudah diverifikasi)

> أُعِيذُكَ بِكَلِمَاتِ اللَّهِ التَّامَّةِ، مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ، وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ
>
> *U‘īdzuka bikalimātillāhit-tāmmah, min kulli syaithānin wa hāmmah, wa min kulli ‘ainin lāmmah.*
>
> “Aku memohonkan perlindungan untukmu dengan kalimat-kalimat Allah yang sempurna,
> dari setiap setan dan binatang berbisa, dan dari setiap pandangan mata yang jahat (‘ain).”

- **أُعِيذُكَ (U‘īdzu-ka)**: untuk anak laki-laki. **أُعِيذُكِ (U‘īdzu-ki)**: untuk anak perempuan.
- **أُعِيذُكُمَا (U‘īdzukumā)**: untuk dua anak. Ini lafaz Nabi ﷺ untuk Hasan & Husein.
- Sumber: HR. Al-Bukhari no. 3371 (Ibnu ‘Abbas; di dalamnya disebutkan bahwa Nabi Ibrahim
  membacakannya untuk Ismail & Ishak), HR. Abu Dawud no. 4737 dan At-Tirmidzi no. 2060
  (dengan lafaz أُعِيذُكُمَا, disahihkan Al-Albani).
  Teks Arab dicocokkan dengan dataset hadits `fawazahmed0/hadith-api`.
- Audio bagian doa juga dicek dengan Whisper large-v3 (mode Arab). Hasilnya cocok:
  Ustadz membaca bentuk **أُعِيذُكَ**.

## Susunan adegan

| Waktu | Adegan |
| --- | --- |
| 0:00–0:04 | Hook: **DOA PERLINDUNGAN / UNTUK / ANAK** + kaligrafi دُعَاءُ تَحْصِينِ الْأَطْفَالِ |
| 0:04–0:10 | Kubah cahaya melindungi anak, gangguan (asap gelap) terpental |
| 0:10–0:23 | Kartu doa: 3 baris Arab muncul sesuai bacaan Ustadz, lengkap dengan arti & sumber |
| 0:23–0:27 | “Ka untuk laki-laki, Ki untuk perempuan” (أُعِيذُكَ / أُعِيذُكِ) |
| 0:27–0:37 | Sabda Nabi ﷺ (HR. Bukhari 3371) → Nabi Ibrahim → Ismail & Ishak → para Nabi |
| 0:37–0:43 | Nabi Muhammad ﷺ → lafaz أُعِيذُكُمَا → cucu beliau Hasan & Husein |
| 0:43–0:48 | إِنْ شَاءَ اللَّهُ: anak-anak terlindungi dari gangguan & kemudaratan |

Subtitle tampil kata per kata sesuai ucapan Ustadz. Kata yang sedang diucapkan
berwarna emas. Timing diambil dari caption kata per kata di video asli, lalu
dicocokkan lagi dengan audio.

## Render ulang

```bash
# butuh: node + playwright (chromium), ffmpeg
node render.js --workers 4            # -> output/doa-perlindungan-anak.mp4
node snap.js /tmp/cek 3 14 31 46.7    # cek frame tertentu
node make-srt.js                      # -> output/subtitle.srt
```

Buka `index.html?play` di browser untuk preview animasi (tanpa suara), atau
`index.html?t=14` untuk melihat satu detik tertentu.
