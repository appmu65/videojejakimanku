# Rumus Doa Dikabulkan — Animated Video

Video animasi vertikal (1080×1920, 30 fps, 34,4 detik) dari potongan kajian
**Ustadz Reyza Zamzamy**. Suaranya diambil dari video asli, sedangkan semua
visualnya dibuat ulang sebagai animasi. Palet warna, ornamen, dan tata letak
credit (**@jejakiman.ku**) sama dengan video *Doa Perlindungan untuk Anak*.

| File | Isi |
| --- | --- |
| `output/rumus-doa-dikabulkan.mp4` | Video final (H.264 + AAC 192 kbps) |
| `output/cover.jpg` | Cover / thumbnail (frame hook tanpa subtitle) |
| `output/subtitle.srt` | Subtitle ucapan Ustadz, sudah bertimestamp |
| `output/caption-instagram.txt` | Caption Instagram (teks lengkap doa + sumber) |
| `index.html` | Sumber animasi (HTML/SVG/Canvas, dirender per frame) |
| `render.js` | Merender `index.html` per frame lalu menggabungkannya dengan audio |
| `snap.js` | Merender detik tertentu menjadi PNG untuk dicek |
| `make-srt.js` | Membuat `subtitle.srt` dari tabel subtitle di `index.html` |
| `assets/audio/` | Audio asli ceramah (stream AAC disalin tanpa re-encode) |
| `assets/fonts/` | Poppins, Amiri, Aref Ruqaa (lisensi SIL OFL, file lisensi ikut disertakan) |

## Teks zikir (sudah diverifikasi)

> اللَّهُمَّ إِنِّي أَسْأَلُكَ بِأَنِّي أَشْهَدُ أَنَّكَ أَنْتَ اللَّهُ، لَا إِلَهَ إِلَّا أَنْتَ، الْأَحَدُ الصَّمَدُ، الَّذِي لَمْ يَلِدْ وَلَمْ يُولَدْ، وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ
>
> *Allāhumma innī as-aluka bi-annī asyhadu annaka antallāh, lā ilāha illā anta, al-aḥad ash-shamad,
> alladzī lam yalid wa lam yūlad, wa lam yakun lahū kufuwan aḥad.*
>
> “Ya Allah, sesungguhnya aku memohon kepada-Mu dengan persaksianku bahwa Engkaulah Allah, tiada Tuhan
> (yang berhak disembah) selain Engkau, Yang Maha Esa, tempat bergantung segala sesuatu, yang tidak beranak
> dan tidak diperanakkan, dan tidak ada seorang pun yang setara dengan-Nya.”

Sabda Nabi ﷺ tentang zikir ini (HR. Abu Dawud no. 1493):

> لَقَدْ سَأَلْتَ اللَّهَ بِالِاسْمِ الَّذِي إِذَا سُئِلَ بِهِ أَعْطَى، وَإِذَا دُعِيَ بِهِ أَجَابَ
>
> “Sungguh, engkau telah memohon kepada Allah dengan nama-Nya yang apabila Dia diminta dengannya,
> Dia memberi, dan apabila Dia diseru dengannya, Dia mengabulkan.”

- Sumber: HR. At-Tirmidzi no. 3475 (lafaz **بِأَنِّي**, sama dengan yang dibaca Ustadz),
  HR. Abu Dawud no. 1493 (lafaz أَنِّي) & no. 1494 (*bismihil a‘zham*), HR. Ibnu Majah no. 3857.
  Semuanya dinilai **sahih** oleh Syaikh Al-Albani.
  Teks Arab dicocokkan dengan dataset hadits `fawazahmed0/hadith-api`.
- Audio bagian zikir juga dicek dengan Whisper large-v3 (mode Arab). Hasilnya cocok
  kata per kata dengan lafaz At-Tirmidzi di atas.

## Susunan adegan

| Waktu | Adegan |
| --- | --- |
| 0:00–0:03 | Hook: **RUMUS DOA / DIKABULKAN** + kaligrafi الدُّعَاءُ الْمُسْتَجَابُ |
| 0:03–0:06 | Rumusnya: **ZIKIR** (tasbih) **+ DOA KITA** (tangan berdoa) = doa mudah dikabulkan |
| 0:06–0:09 | Medali Nabi Muhammad ﷺ bersabda → kartu **HADIS SHAHIH** (HR. Abu Dawud 1493 dkk.) |
| 0:09–0:15 | Isi sabda: إِذَا سُئِلَ بِهِ أَعْطَى → *Niscaya diberi*, وَإِذَا دُعِيَ بِهِ أَجَابَ → *Niscaya dikabulkan* |
| 0:15–0:18 | Sebelum meminta apa pun: langkah **1 Zikir** → **2 Doa** |
| 0:18–0:29 | Kartu zikir: 4 baris Arab menyala sesuai bacaan Ustadz, lengkap dengan arti & sumber |
| 0:29–0:34 | Tasbih selesai ✓ → tangan berdoa, cahaya naik membawa hajat → آمِين, *semoga Allah mengabulkannya* |

Video berakhir tepat setelah Ustadz mengucapkan *“semoga Allah mengabulkannya”* (audio
dipotong di 33,62 detik, frame terakhir ditahan sampai 34,4 detik). Ajakan share/komen di
akhir video asli tidak dipakai.

Subtitle tampil kata per kata sesuai ucapan Ustadz. Kata yang sedang diucapkan
berwarna emas. Frasa dan teksnya diambil dari caption video asli (dicek ulang dengan
Whisper large-v3), lalu waktu tiap kata ditentukan dengan mentranskripsi potongan audio
yang berhenti di setiap jeda (energi audio terendah).

## Render ulang

```bash
# butuh: node + playwright (chromium), ffmpeg
node render.js --workers 4            # -> output/rumus-doa-dikabulkan.mp4
node snap.js /tmp/cek 2 14 23 32      # cek frame tertentu
node make-srt.js                      # -> output/subtitle.srt
```

Buka `index.html?play` di browser untuk preview animasi (tanpa suara), atau
`index.html?t=14` untuk melihat satu detik tertentu.
