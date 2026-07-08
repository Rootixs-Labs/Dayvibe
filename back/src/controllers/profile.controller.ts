import type { Request, Response } from "express";
import { profileService } from "../services/profile.service.js";
import {
  updateProfileSchema,
  profileIdParamSchema,
} from "../validators/profile.validator.js";

// HTTP layer for the Profile entity: validates input, calls the service,
// and shapes the response. Holds no business logic.
export const profileController = {
  async getById(req: Request, res: Response) {
    const { id } = profileIdParamSchema.parse(req.params);
    const profile = await profileService.findById(id);
    res.json({ success: true, data: profile });
  },

  async update(req: Request, res: Response) {
    const { id } = profileIdParamSchema.parse(req.params);
    const data = updateProfileSchema.parse(req.body);
    const profile = await profileService.update(id, data);
    res.json({ success: true, data: profile });
  },
};
