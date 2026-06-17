import type { Request, Response } from 'express';
import { userService } from '../services/user.service.js';
import {
  createUserSchema,
  updateUserSchema,
  userIdParamSchema,
} from '../validators/user.validator.js';

// HTTP layer for the User entity: validates input, calls the service,
// and shapes the response. Holds no business logic.
export const userController = {
  async list(_req: Request, res: Response) {
    const users = await userService.findAll();
    res.json({ success: true, data: users });
  },

  async getById(req: Request, res: Response) {
    const { id } = userIdParamSchema.parse(req.params);
    const user = await userService.findById(id);
    res.json({ success: true, data: user });
  },

  async create(req: Request, res: Response) {
    const data = createUserSchema.parse(req.body);
    const user = await userService.create(data);
    res.status(201).json({ success: true, data: user });
  },

  async update(req: Request, res: Response) {
    const { id } = userIdParamSchema.parse(req.params);
    const data = updateUserSchema.parse(req.body);
    const user = await userService.update(id, data);
    res.json({ success: true, data: user });
  },

  async remove(req: Request, res: Response) {
    const { id } = userIdParamSchema.parse(req.params);
    await userService.remove(id);
    res.status(204).send();
  },
};
