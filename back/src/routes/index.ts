import { Router } from "express";
import { userRoutes } from "./user.routes.js";
import { profileRoutes } from "./profile.routes.js";

// Root API router. Mount each feature module here under its own prefix.
const router = Router();

router.use("/users", userRoutes);
router.use("/profiles", profileRoutes);

export { router as routes };
