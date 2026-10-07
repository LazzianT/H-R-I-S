import { Router } from 'express';
import { asyncHandler, httpError } from '../../lib/http.js';
import * as service from './service.js';

/** Padanan hris/employee_temporary, employeeTempConfirm, employeeTempConfirmAct. */
export function temporaryRouter() {
  const r = Router();

  r.get('/', asyncHandler(async (_req, res) => res.json(await service.listTemporary())));

  r.get(
    '/confirm/:nip/:date',
    asyncHandler(async (req, res) => {
      const { nip, date } = req.params;
      res.json(service.confirmInfo(nip, date));
    })
  );

  r.post(
    '/confirm',
    asyncHandler(async (req, res) => {
      const { NIP, date } = req.body || {};
      if (!NIP || !date) throw httpError(400, 'NIP dan date wajib diisi');
      res.json(await service.confirmAct(NIP, date));
    })
  );

  return r;
}
