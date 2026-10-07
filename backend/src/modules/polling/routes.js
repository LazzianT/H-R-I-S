import { Router } from 'express';
import { asyncHandler } from '../../lib/http.js';
import * as service from './service.js';

/** Padanan hris/getlistPoling + getDataPoling. */
export function pollingRouter() {
  const r = Router();

  r.get('/', asyncHandler(async (_req, res) => res.json(await service.listPolling())));

  r.post(
    '/chart',
    asyncHandler(async (req, res) => {
      const { idPoling } = req.body || {};
      res.json(await service.chart(idPoling));
    })
  );

  return r;
}
