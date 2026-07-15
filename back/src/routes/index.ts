import { Router } from "express";
import { userRoutes } from "./user.routes.js";
import { profileRoutes } from "./profile.routes.js";
import { taskRoutes } from './task.routes.js';

// Root API router. Mount each feature module here under its own prefix.
const router = Router();

router.use("/users", userRoutes);
router.use("/profiles", profileRoutes);
router.use('/tasks', taskRoutes);

export { router as routes };