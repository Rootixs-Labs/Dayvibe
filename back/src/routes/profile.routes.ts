import { Router } from "express";
import { profileController } from "../controllers/profile.controller.js";

// Routes for the User entity. Mounted under /api/v1/profiles by the root router.
const router = Router();

router.get("/:id", profileController.getById);
router.put("/:id", profileController.update);

export { router as profileRoutes };
