import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.middleware.js';
import * as ctrl from '../controllers/orders.controller.js';

const router = Router();

router.get('/orders', requireAuth, ctrl.list);
router.post('/orders', requireAuth, ctrl.create);
router.patch('/orders/:id', requireAuth, ctrl.update);
router.patch('/orders/:id/status', requireAuth, ctrl.updateStatus);
router.delete('/orders/:id', requireAuth, ctrl.remove);

export default router;
