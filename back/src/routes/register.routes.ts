import { Router } from 'express';
import { registerController } from '../controllers/register.controller.js';

// Routes for the User entity. Mounted under /api/users by the root router.
const router = Router();

router.get('/', registerController.list);
router.post('/', registerController.register);

export { router as registerRoutes };