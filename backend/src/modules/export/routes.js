import { Router } from 'express';
import { asyncHandler } from '../../lib/http.js';
import * as service from './service.js';

/* Padanan modul export di hris.php (data_employ, emp_datatable). */
export function exportRouter() {
  const r = Router();

  // hris/emp_datatable()
  r.get(
    '/employees',
    asyncHandler(async (_req, res) => {
      res.json({ data: await service.getEmployees() });
    })
  );

  // hris/data_employ(): hanya menampilkan view hris/data_emp, tanpa query data.
  r.get('/employees/raw', (_req, res) => res.json({ data: [] }));

  return r;
}
