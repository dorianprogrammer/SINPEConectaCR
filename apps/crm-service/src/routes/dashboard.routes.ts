import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import * as ctrl from '../controllers/dashboard.controller.js';

const router = Router();

router.get('/dashboard/summary', authenticate, ctrl.summary);

export default router;
