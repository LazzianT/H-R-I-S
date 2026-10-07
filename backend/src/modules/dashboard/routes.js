import { Router } from 'express';
import { asyncHandler } from '../../lib/http.js';
import * as service from './service.js';

export function dashboardRouter() {
  const r = Router();

  // Agregat dashboard (read-only): totals, jobLevel, education, age, workingTime, recent
  r.get(
    '/summary',
    asyncHandler(async (_req, res) => {
      res.json(await service.summary());
    })
  );

  return r;
}
