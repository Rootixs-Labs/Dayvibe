import { Router } from 'express';
import { userController } from '../controllers/user.controller.js';

// Routes for the User entity. Mounted under /api/users by the root router.
const router = Router();

router.get('/', userController.list);
router.get('/:id', userController.getById);
router.post('/', userController.create);
router.put('/:id', userController.update);
router.delete('/:id', userController.remove);

export { router as userRoutes };
