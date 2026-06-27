import type { Request, Response } from 'express';
import { registerService } from '../services/register.service.js';
import {
  createRegisterSchema,
} from '../validators/register.validator.js';

// HTTP layer for the User entity: validates input, calls the service,
// and shapes the response. Holds no business logic.
export const registerController = {

  async register(req: Request, res: Response) {
    const data = createRegisterSchema.parse(req.body);
    const user = await registerService.create(data);
    res.status(201).json({ success: true, data: user });
  },
};
