import { Router } from 'express';
import { asyncHandler } from '../../lib/http.js';
import * as service from './service.js';

export function permitRouter() {
  const r = Router();

  r.get(
    '/',
    asyncHandler(async (req, res) => {
      res.json(await service.transactions(req.query));
    })
  );

  // Special leave = permit dengan IdType = 2 pada hris_Permit_SubGroup.
  r.get(
    '/special',
    asyncHandler(async (req, res) => {
      res.json(await service.transactions({ ...req.query, idType: 2 }));
    })
  );

  return r;
}
