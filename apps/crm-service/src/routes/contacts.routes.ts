import { Router } from 'express';
import * as ctrl from '../controllers/contacts.controller.js';
import { requireAuth } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/contacts', requireAuth, ctrl.list);
router.post('/contacts', requireAuth, ctrl.create);
router.patch('/contacts/:id', requireAuth, ctrl.update);
router.delete('/contacts/:id', requireAuth, ctrl.remove);

export default router;
