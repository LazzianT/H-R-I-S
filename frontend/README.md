# frontend

React + Vite frontend untuk `backend`. Konvensi: lihat `AGENTS.md`.

## Setup
```
copy .env.example .env
npm install
npm run dev      # http://localhost:5173
npm run build
```

Env: `VITE_API_BASE_URL` (mis. http://localhost:4000/api),
`VITE_UPLOAD_BASE_URL` (mis. http://localhost:4000/uploads).

## Struktur
```
src/
  api/client.js      axios + token + UPLOAD_BASE
  api/useFetch.js    hook GET
  auth/              AuthContext + ProtectedRoute
  layout/AppLayout   sidebar + topbar
  components/ui.jsx  Page, Card, DataTable
  pages/...          30 halaman (mapping view CI)
```

## Halaman
Dashboard, Emp Data (+form), Employee Table, Employee Temporary,
Jobtitle, Department, Man Resources, Strategic Plan,
Time Attendance, Log For Etcom, Attendance Log,
Leave Log, Tanggal Cuti Massal, Leave Day,
Disciplinary, Employee Competence, Pride,
Training, Training Participants,
Education, Age, Employee List, Retired, Level Two,
User Online PR, User E Procurement, Report Poling, HR Policy.

## Catatan
- Halaman kehadiran/cuti memakai filter tanggal (default hari ini).
- Modul competence/disciplinary menampilkan pesan error karena tabel DB tidak ada
  (lihat README root).
- Tabel HTML dari `/manpower/resource` dirender via `dangerouslySetInnerHTML`
  (sumber mengirim markup jadi).
