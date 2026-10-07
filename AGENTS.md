# HRIS — Project Constitution (AGENTS.md)

Ini **existing HRIS** yang sudah berjalan. Bukan project kosong.
Tujuan tim agent: **Understand first. Modify second.**

## Aturan utama

- **Existing implementation = source of truth.** Kode > dokumen. Jika dokumen beda dengan kode,
  laporkan discrepancy, jangan ubah kode agar cocok dokumen.
- **Understand → Analyze → Plan → Delegate → Implement → Test → Review.**
  Dilarang `REQUEST → ASSUME → CREATE NEW ARCHITECTURE`.
- **Reuse sebelum create.** Search existing dulu. Prioritas: existing → reuse → extend →
  refactor → baru buat baru. Jangan duplikasi fungsi/komponen/query.
- **Minimal safe change.** Scoped, reversible, konsisten, testable. Jangan refactor tak terkait.
- **Jangan ubah architecture/framework/struktur DB/design system/naming tanpa diminta eksplisit.**
  Technical debt dicatat, bukan langsung dibongkar.
- **Jangan operasi destruktif** (drop table/kolom, hapus data, hapus file) tanpa otorisasi.
- **Preserve behavior.** Fitur existing wajib tetap jalan setelah perubahan.
- **Testing wajib.** Regression check feature lama, bukan hanya feature baru.
- **Security.** HR data = sensitif. Jangan expose password/token/API key/DBCredential/secret.
- **Tidak boleh mengarang.** Requirement/business rule tidak jelas → tanya, jangan tebak.

## Stack (terverifikasi)

- **backend/**: Express 4 + mssql (SQL Server `BMC`, raw SQL parameterized `@param`) + JWT. ESM, Node >= 20.
- **frontend/**: React 18 + Vite 5 + Tailwind v4 + react-router-dom 6 + axios + motion + recharts.
- **DB**: `BMC.dbo.hris_Employee` dll. Login = NIP + BirthDate `ddmmyy`. TVF `hris_EmployeeAnalisis()`.
- Sumber asli: CodeIgniter `hris.php` + `M_hris.php` (logic & SQL dipertahankan).

## Konvensi per repo (WAJIB dibaca sebelum kerja di area itu)

- `backend/AGENTS.md` — konvensi backend + mapping method → endpoint.
- `frontend/AGENTS.md` — konvensi frontend + mapping endpoint → halaman.
- `frontend/DESIGN.md` — design direction (palet Navy/Soft/Lime, Plus Jakarta Sans, radius, motion).

## Agent team

Detail di `.opencode/README.md`. Orchestrator memimpin; specialist dipanggil sesuai kebutuhan.
Semua agent tunduk pada aturan di file ini.
