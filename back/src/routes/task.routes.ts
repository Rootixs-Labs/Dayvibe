import { Router } from 'express';
import { taskController } from '../controllers/user.controller.js';

// Routes for the User entity. Mounted under /api/users by the root router.
const router = Router();

router.get('/', taskController.list);
router.get('/:id', taskController.getById);
router.post('/', taskController.create);
router.put('/:id', taskController.update);
router.delete('/:id', taskController.remove);

export { router as taskRoutes };
