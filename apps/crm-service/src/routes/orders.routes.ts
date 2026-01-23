import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import * as ctrl from '../controllers/orders.controller.js';

const router = Router();

router.get('/orders', authenticate, ctrl.list);
router.post('/orders', authenticate, ctrl.create);
router.put('/orders/:id', authenticate, ctrl.update);
router.put('/orders/:id/status', authenticate, ctrl.updateStatus);
router.delete('/orders/:id', authenticate, ctrl.remove);

export default router;
