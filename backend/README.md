# backend

Express + mssql. Port dari CodeIgniter `hris.php` + `M_hris.php`.
Konvensi & mapping modul: lihat `AGENTS.md`.

## Setup
```
copy .env.example .env
npm install
npm run dev
```

Env penting: `DB_SERVER`, `DB_NAME` (BMC), `DB_USER`, `DB_PASSWORD`, `JWT_SECRET`,
`WA_BASE_URL`, `WA_TOKEN`, `UPLOAD_DIR`.

## Struktur
```
src/
  config/index.js      env
  db/pool.js           getPool / query / queryOne / execute
  lib/                 http (ApiError, asyncHandler), upload (jpgUpload), notify (sendWa)
  middleware/          auth (JWT), error
  modules/<modul>/     routes.js + service.js
  routes.js            agregator (auth publik, sisanya wajib token)
  index.js             bootstrap
uploads/               file upload (foto, warning letter)
```

## Endpoint
Auth publik: `POST /api/auth/login`, `GET /api/auth/me`, `POST /api/auth/logout`.
Sisanya `Authorization: Bearer <token>`.

Login memakai `hris_Employee`: `username` = `NIP`, `password` = tanggal lahir `ddmmyy`
(dicocokkan ke `BirthDate` `yyyy-mm-dd`).

Daftar lengkap per modul ada di `AGENTS.md`, dan di `src/modules/*/routes.js`.
Ringkas:
- `/employees` (+`/profiles`, `/records`)
- `/departments`, `/jobtitles`, `/organization/hierarchy/:nip`
- `/training`, `/training/hc/participants`
- `/attendance/logs|timeatt|etcom`
- `/leave/transactions|massal|day`, `POST /leave/generate`
- `/disciplinary`, `/competence/*`
- `/statistics/*`
- `/manpower/resource|strategic`
- `/temporary`, `/users/pr|ep`, `/polling`, `/export/employees`

## Keamanan
- Semua SQL memakai parameter terikat (`@param`), bukan interpolasi.
- Password: tanggal lahir (`ddmmyy`) dicek ke `hris_Employee.BirthDate`. Kredensial lemah
  secara alami; pertimbangkan rate limit / 2FA bila sistem dibuka lebih luas.
- Belum ada: otorisasi per-role, rate limit, validasi skema input (zod).
  Add when: multi-role / exposure eksternal.

## Catatan
- `getPool()` koneksi tunggal (mssql pool default). Untuk trafik tinggi, sesuaikan `config.db.pool`.
- WA (`sendWa`) fire-and-forget; kegagalan tidak menggagalkan request.
