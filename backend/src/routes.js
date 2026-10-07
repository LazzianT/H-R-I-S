import { Router } from 'express';
import { requireAuth } from './middleware/auth.js';
import { authRouter } from './modules/auth/routes.js';

/**
 * Agregator semua router modul HRIS.
 * Padanan mapping method controller hris.php -> endpoint ada di ../docs/API.md
 */
export function router() {
  const r = Router();

  // publik
  r.use('/auth', authRouter());

  // wajib login (padanan session user='Admin')
  const secured = Router();
  secured.use(requireAuth);

  secured.use('/employees', employeesRouter());
  secured.use('/departments', departmentsRouter());
  secured.use('/divisions', divisionsRouter());
  secured.use('/joblevels', joblevelsRouter());
  secured.use('/jobtitles', jobtitlesRouter());
  secured.use('/organization', organizationRouter());
  secured.use('/training', trainingRouter());
  secured.use('/attendance', attendanceRouter());
  secured.use('/leave', leaveRouter());
  secured.use('/permit', permitRouter());
  secured.use('/disciplinary', disciplinaryRouter());
  secured.use('/competence', competenceRouter());
  secured.use('/statistics', statisticsRouter());
  secured.use('/dashboard', dashboardRouter());
  secured.use('/manpower', manpowerRouter());
  secured.use('/temporary', temporaryRouter());
  secured.use('/users', usersRouter());
  secured.use('/polling', pollingRouter());
  secured.use('/export', exportRouter());

  r.use(secured);
  return r;
}

import { employeesRouter } from './modules/employees/routes.js';
import { departmentsRouter } from './modules/departments/routes.js';
import { divisionsRouter } from './modules/divisions/routes.js';
import { joblevelsRouter } from './modules/joblevels/routes.js';
import { jobtitlesRouter } from './modules/jobtitles/routes.js';
import { organizationRouter } from './modules/organization/routes.js';
import { trainingRouter } from './modules/training/routes.js';
import { attendanceRouter } from './modules/attendance/routes.js';
import { leaveRouter } from './modules/leave/routes.js';
import { permitRouter } from './modules/permit/routes.js';
import { disciplinaryRouter } from './modules/disciplinary/routes.js';
import { competenceRouter } from './modules/competence/routes.js';
import { statisticsRouter } from './modules/statistics/routes.js';
import { dashboardRouter } from './modules/dashboard/routes.js';
import { manpowerRouter } from './modules/manpower/routes.js';
import { temporaryRouter } from './modules/temporary/routes.js';
import { usersRouter } from './modules/users/routes.js';
import { pollingRouter } from './modules/polling/routes.js';
import { exportRouter } from './modules/export/routes.js';
