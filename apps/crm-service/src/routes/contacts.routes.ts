import { Router } from 'express';
import * as ctrl from '../controllers/contacts.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/contacts', authenticate, ctrl.list);
router.post('/contacts', authenticate, ctrl.create);
router.put('/contacts/:id', authenticate, ctrl.update);
router.delete('/contacts/:id', authenticate, ctrl.remove);

export default router;
