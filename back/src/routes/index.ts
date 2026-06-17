import { Router } from 'express';
import { userRoutes } from './user.routes.js';

// Root API router. Mount each feature module here under its own prefix.
const router = Router();

router.use('/users', userRoutes);

export { router as routes };
