# Konvensi frontend

Frontend React (Vite, JS/JSX) untuk backend. Tiap halaman = padanan view CodeIgniter di
`application/views/hris/`. Data diambil dari REST API (lihat `D:\Lazzian Al Falah\Developing\hris\backend\src\modules\*`).

## Struktur
```
src/
  api/client.js     api (axios, baseURL VITE_API_BASE_URL), errMsg, UPLOAD_BASE
  api/useFetch.js   useFetch(path, deps) -> { data, loading, error, reload }
  auth/AuthContext.jsx   useAuth() -> { user, loading, login, logout }
  layout/AppLayout.jsx   sidebar + topbar (dipakai via route)
  components/ui.jsx      Page, Card, DataTable, LinkButton
  pages/...              satu file per halaman, default export
```

## Aturan
- Setiap file page: `export default function Nama()`.
- Bungkus isi dengan `<Page title="...">`; panel `<Card>`; tabel `<DataTable columns rows>`.
- Ambil data pakai `useFetch('/departments')` (path relatif ke baseURL, tanpa `/api`).
  Untuk aksi (POST/PUT/DELETE) pakai `api` dari `api/client.js`, tangkap error dengan `errMsg`.
- Kolom tabel: `{ key, label, render? }`. `render(r)` menerima satu baris.
- URL upload file: `${UPLOAD_BASE}/<path>` (mis. `${UPLOAD_BASE}/hris/Foto/1234.jpg`).
- Form kontinu pakai state lokal + `api.post/patch/put`. Tampilkan pesan error class `err`.
- JANGAN tambah dependency baru. Pakai yang sudah ada (react, react-dom, react-router-dom, axios).
- Jangan ubah file di luar `src/pages/**`.
- Field response mengikuti casing kolom DB apa adanya (banyak huruf besar). Cek service server
  untuk bentuk pasti sebelum menulis kolom.

## Mapping endpoint (server)
- GET /employees/:nip -> { emp:{...}, car, edu, fam, tra, exp, dept, abs, id, nip }
- POST/PUT /employees/profiles, POST/PUT/DELETE /employees/records
- /departments, /jobtitles, /organization/hierarchy/:nip
- /training/summary, /training/hc/participants*
- /attendance/logs, /attendance/logs/:id, /attendance/timeatt, /attendance/etcom
- /leave/transactions, /leave/massal, /leave/day, POST /leave/generate
- /disciplinary (+ /input-options, /employees-by-dept, /ref-offence), POST/PUT/DELETE /disciplinary
- /competence/employee, /competence/detail, /competence/pride/:jobseq, /competence/dashboard
- /statistics/education, /age, /employees, /retired, /level-two, /family, /level-three, /level-four, /level-training
- /manpower/resource, /manpower/resource/detail, /manpower/strategic
- /temporary, POST /temporary/confirm
- /users/pr, /users/ep, /polling, /polling/chart
- /export/employees

## Verifikasi sintaks per file (JSX)
```
npx --yes esbuild@0.24.0 "<file>" --loader:.jsx=jsx --outfile=_check.js
Remove-Item _check.js
```
(Full `npm run build` dijalankan setelah semua halaman ada.)
