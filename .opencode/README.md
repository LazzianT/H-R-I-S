# OpenCode Agent System — HRIS

Sistem multi-agent untuk **existing HRIS** (Express + React). Tujuan: understand first, modify second.
Existing implementation = source of truth.

## Agent

| Agent | Peran | Dipakai saat |
|---|---|---|
| `orchestrator` (primary) | Tech Lead: analisa, delegasi, review | Semua task non-trivial |
| `codebase` | Map struktur, pattern, kode reusable, debt | Cari implementasi existing sebelum buat baru |
| `database` | Tabel/kolom/relasi/query SQL Server BMC | Task yang menyentuh data/query |
| `business-logic` | Rule bisnis, workflow, status, approval | Task yang mengubah perilaku |
| `frontend` | React/Vite/Tailwind, komponen, design | Task UI/halaman |
| `backend` | Express/mssql/JWT, route/service | Task API/logika server |
| `security` | Auth, permission, validasi, secret, injection | Menyentuh auth/data sensitif/input user |
| `qa` | Feature test, regression, edge case | Setelah implementasi |
| `documentation` | Jaga knowledge & dokumen | Setelah perubahan penting |

## Alur orkestrasi

```text
                    USER
                     │
                     ▼
              ORCHESTRATOR
               /    |    \
              /     |     \
             ▼      ▼      ▼
        CODEBASE  BUSINESS  DATABASE
           │        LOGIC      │
           │          │        │
           └──────┬───┴────────┘
                  │
          ┌───────┴────────┐
          ▼                ▼
      FRONTEND          BACKEND
          │                │
          └───────┬────────┘
                  ▼
             SECURITY
                  │
                  ▼
                 QA
                  │
                  ▼
             FINAL REVIEW
```

Tidak semua agent wajib dipanggil. Orchestrator memilih yang relevan.

## Contoh: "Tambahkan fitur pengajuan cuti"

```text
Orchestrator
  ├── codebase      → cari implementasi leave existing (modules/leave)
  ├── database      → tabel leave/employee/approval + query existing
  ├── business-logic→ aturan approval/cuti existing
  ├── frontend      → pattern form/tabel existing
  ├── backend       → arsitektur route/service existing
  └── security      → permission terkait
        ↓
  Implementasi → QA → Final Review
```

## Aturan global

Lihat `AGENTS.md` (root). Konvensi per repo: `backend/AGENTS.md`, `frontend/AGENTS.md`, `frontend/DESIGN.md`.

Prinsip: reuse > create · minimal safe change · no blind refactor · no duplicate logic ·
no destructive DB ops · no assumptions · preserve behavior · test wajib.
