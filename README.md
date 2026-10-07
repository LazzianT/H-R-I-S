# HRIS BMC (React + Express)

Rekreasi modul HRIS dari CodeIgniter (`webapps/application/controllers/hris.php` +
`models/M_hris.php`) ke dua repo terpisah. Database & business logic dipertahankan.

```
hris/
  backend/   Express + mssql (raw SQL parameterized) + auth JWT
  frontend/   React + Vite (30 halaman)
```

## Menjalankan

Terminal 1:
```
cd backend
copy .env.example .env      # sesuaikan DB & JWT_SECRET
npm install
npm run dev                 # http://localhost:4000
```

Terminal 2:
```
cd frontend
copy .env.example .env
npm install
npm run dev                 # http://localhost:5173
```

Login uji: NIP karyawan dari `hris_Employee` + tanggal lahir format `ddmmyy`.
Contoh: NIP `0000`, tanggal lahir `010199` (BirthDate `1999-01-01`).

## Yang berubah dari sumber

| Aspek | Sumber (PHP) | Sekarang |
|---|---|---|
| Auth | session `user='Admin'`, tabel `hris_user_login` | NIP + tanggal lahir (`ddmmyy`) dari `hris_Employee`, lalu JWT |
| SQL | interpolasi string | `@param` (menutup SQL injection) |
| Output | `$this->load->view` / HTML | JSON REST + React |
| Redirect/flash | `redirect()` + flashdata | JSON `{ ok }` |

### Autentikasi
Login memakai `hris_Employee`: username = `NIP`, password = tanggal lahir yang diketik
`ddmmyy` (mis. `010199`), dicocokkan ke kolom `BirthDate` (`yyyy-mm-dd`).
Aturan abad: `yy` ≤ tahun berjalan (2 digit) → `20yy`, selain itu `19yy`.

## Status modul

Lihat `backend/AGENTS.md` (mapping method -> endpoint) dan `README` masing-masing repo.

**Catatan DB:** tabel modul **Competence/PRIDE** dan **Disciplinary ref-offence**
(`hris_Competence*`, `hris_Pride_*`, `hris_Training*`, `hris_RefOffence`, `hris_RefWarningNumber`)
**tidak ada** di database `BMC` saat ini, sehingga endpoint terkait mengembalikan 500 —
sama seperti PHP aslinya. Halaman React menampilkan pesan error.

## Verifikasi yang sudah dilakukan
- `backend`: boot server + koneksi DB BMC OK; login OK; 13 endpoint read diuji OK.
- `frontend`: `npm run build` sukses (126 modul).
- Dua endpoint (disciplinary, competence) 500 karena tabel target tidak ada (lihat catatan DB).
