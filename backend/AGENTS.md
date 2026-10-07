# Konvensi backend

Port dari CodeIgniter `webapps/application/controllers/hris.php` + `models/M_hris.php`
ke Express + mssql. Business logic & SQL dipertahankan; hanya diparameterisasi.

## Struktur
```
src/
  config/index.js        konfigurasi env
  db/pool.js             getPool/query/queryOne/execute + sql
  lib/http.js            ApiError, httpError, asyncHandler
  lib/upload.js          jpgUpload(subdir, nameFn) -> multer single('file')
  lib/notify.js          sendWa(no, text)
  middleware/auth.js     signToken, requireAuth (sudah dipasang global)
  routes.js              agregator
  modules/<modul>/routes.js + service.js
```

## Aturan
- ESM (`import`/`export`). Node >= 20.
- Setiap service memakai `query(text, params)` / `queryOne` / `execute` dari `../../db/pool.js`.
- DILARANG interpolasi input user ke SQL. Selalu `@param` + object params.
- Nama tabel/skema dipertahankan apa adanya: `BMC.dbo.hris_Employee`, TVF `BMC.dbo.hris_EmployeeAnalisis()`, dll.
- Router: `export function xRouter() { const r = Router(); ... return r; }`
- Handler bungkus `asyncHandler`, error via `httpError(status, msg)`.
- Auth sudah global (kecuali `/auth`). Tidak perlu cek session lagi.
- Nama field response: pakai casing dari kolom DB (Sequelize-free, apa adanya).
- View lama -> endpoint JSON. Data yang dulu di-`$this->load->view` dijadikan GET yang mengembalikan
  array data yang dibutuhkan view tsb (mis. `emp()` -> object `{ emp, car, edu, fam, tra, exp, dept, abs, id }`).
- Upload: `jpgUpload('hris/Foto', req => String(req.body.nip).slice(-4))` lalu `req.file.filename`.
- Notifikasi WA: `sendWa(no, text)` tanpa await (fire-and-forget) kecuali perlu.

## Mapping modul (lihat flow.md)
- employees   : emp, ins_prof, upd_prof, emp_insert/update/delete/edit
- departments : dept, dept_insert/edit/update/delete
- jobtitles   : jobtitle, jbtitle_add/edit/upd, jobtitle_delete
- organization: detail, change_hierarki
- training    : training, hc_training_participants (+ sub-action)
- attendance  : log, log_datatable, log_detail, timeatt(_datatable), log_etcom, etcom(_datatable/_detail)
- leave       : log_cuti, log_cuti_khusus, cuti_datatable, log_massal, massal_datatable, generate_cuti, infoCutiGroupHeadDeptHead
- disciplinary: disciplinary (action: inputpage/employee_by_dept/refoffence/viewedit/save/delete/default)
- competence  : employee_competence, competence_detail, competence_std_input, pride, pride_save, del_std_pride, ins/del_std_training_jbttle/jblvl, pride_training, competence_dash
- statistics  : education(_dept), age, status_kar, leveldua, levelfamily, leveltiga, levelempat, leveltraining, employee, retired, pkb, dash_online, emp_prof
- manpower    : man_resource, man_resource_detail, man_strategic_planning
- temporary   : employee_temporary, employeeTempConfirm(Act)
- users       : user_app_pr(_insert), user_app_ep(_insert)
- polling     : polingReport, getlistPoling, getDataPoling
- export      : data_employ, emp_datatable
