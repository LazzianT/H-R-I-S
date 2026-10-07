import { Router } from 'express';
import { asyncHandler } from '../../lib/http.js';
import * as service from './service.js';

export function joblevelsRouter() {
  const r = Router();

  r.get(
    '/',
    asyncHandler(async (_req, res) => {
      res.json(await service.listJoblevels());
    })
  );

  r.post(
    '/',
    asyncHandler(async (req, res) => {
      res.status(201).json(await service.createJoblevel(req.body || {}));
    })
  );

  r.put(
    '/:seq',
    asyncHandler(async (req, res) => {
      res.json(await service.updateJoblevel(req.params.seq, req.body || {}));
    })
  );

  r.delete(
    '/:seq',
    asyncHandler(async (req, res) => {
      res.json(await service.deleteJoblevel(req.params.seq));
    })
  );

  return r;
}
