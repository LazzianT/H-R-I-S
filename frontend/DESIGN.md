# Design Direction — HRIS BMC

Arah visual dipin dari `src/references/references.png` (konsep referensi: PeopleHub).
Produk/aplikasi bernama **HRIS** (Human Resources Management System).
Ini **Operate** surface untuk dashboard app; landing page adalah surface **Persuade** terpisah.

Dial: **ENERGY 2 / RHYTHM 2 / MOTION 1** (fokus pada tugas; motion hanya hover/focus/state).

## Prinsip
- Angka selalu berasal dari data BMC. Tidak ada metrik, delta, atau nama karangan (R-17, R-38).
- Setiap halaman menjawab satu pertanyaan kerja dan menaruh keputusan di depan.
- Kepadatan informasi diutamakan; container dekoratif dihindari (operate.md).

## Palet (2 core + 1 accent)
| Peran | Hex | Alasan (R-31) |
|---|---|---|
| Core: Navy | `#0B1F3B` | teks, sidebar, tombol primer; kesan tenang, kredibel untuk data HR |
| Core: Soft | `#F3F6F2` | latar halaman; menurunkan kelelahan mata saat kerja lama |
| Accent: Lime | `#87F34A` | satu aksen untuk status aktif/fokus/progres, dipakai hemat |
| Netral | `#FFFFFF`, `#DFE6DC`, `#5B6B7F` | permukaan, garis, teks sekunder |

Selain ini hanya warna status: `#B91C1C` (bahaya), `#A15C07` (peringatan).
Lime-600 `#5FB822` untuk varian gelap agar kontras teks tetap lolos AA.

## Tipografi
- **Plus Jakarta Sans** (variable, self-host). Alasan: geometris-humanis, netral untuk angka dan teks panjang, tidak terasa "default AI" seperti Inter/Geist.
- Skala: h1 26 / h2 20 / h3 17 / h4 14; body 14, line-height 1.55; measure ≤72ch.
- Angka data selalu `tabular-nums` supaya kolom tabel rata.
- `text-wrap: balance` pada heading.

## Bentuk
- Radius: kartu/panel 14px, kontrol 10px, kontrol kecil 8px, badge 6px. Bukan semua pill (R-11).
- Shadow hanya saat elevasi perlu; hover baris memakai latar, bukan bayangan.

## Aturan yang dipatuhi
- **Tanpa kicker/eyebrow di atas heading** (impeccable craft-floor: ban).
- **Tanpa dot dekoratif, panah di tombol, badge dekoratif** (R-08, R-09).
- **Tanpa animasi page-load**; motion = hover/focus/state saja (MOTION 1, R-19).
- Empty/loading/error state nyata dengan sebab + langkah berikutnya (R-27).

## Aksen identitas
Satu motif: **aksen lime pada kontrol aktif/fokus** (nav aktif, tombol aksen, progress). Itu satu-satunya tempat lime muncul dalam jumlah; sisanya navy dan netral.

## Cakupan
- Shell (sidebar, topbar, login, dashboard) sudah pada arah ini.
- Halaman lain mewarisi token via `Page/Card/DataTable` + class `.card/.grid`.
