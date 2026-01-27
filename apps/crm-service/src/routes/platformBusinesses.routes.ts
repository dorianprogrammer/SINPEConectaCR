import { Router } from 'express';
import {
  createPlatformBusiness,
  listPlatformBusinesses,
} from '../controllers/platformBusinesses.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

// protect all platform routes
router.use(authenticate);

// SUPER check (simple + direct, no extra middleware file)
router.use((req: any, res, next) => {
  if (req.user?.role !== 'SUPER') return res.status(403).json({ message: 'Forbidden' });
  next();
});

router.get('/platform/businesses', listPlatformBusinesses);
router.post('/platform/businesses', createPlatformBusiness);

export default router;
