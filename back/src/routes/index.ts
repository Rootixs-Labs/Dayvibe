import { Router } from 'express';
import { userRoutes } from './user.routes.js';
import { registerRoutes } from './register.routes.js';

// Root API router. Mount each feature module here under its own prefix.
const router = Router();

router.use('/users', userRoutes);

router.use('/register', registerRoutes);

export { router as routes };
