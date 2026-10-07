import { Router } from 'express';
import { asyncHandler } from '../../lib/http.js';
import * as service from './service.js';

export function divisionsRouter() {
  const r = Router();

  r.get(
    '/',
    asyncHandler(async (_req, res) => {
      res.json(await service.listDivisions());
    })
  );

  r.post(
    '/',
    asyncHandler(async (req, res) => {
      res.status(201).json(await service.createDivision(req.body || {}));
    })
  );

  r.put(
    '/:id',
    asyncHandler(async (req, res) => {
      res.json(await service.updateDivision(req.params.id, req.body || {}));
    })
  );

  r.delete(
    '/:id',
    asyncHandler(async (req, res) => {
      res.json(await service.deleteDivision(req.params.id));
    })
  );

  return r;
}
