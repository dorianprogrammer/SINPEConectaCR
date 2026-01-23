import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.middleware.js';
import * as ctrl from '../controllers/dashboard.controller.js';

const router = Router();

router.get('/dashboard/summary', requireAuth, ctrl.summary);

export default router;
