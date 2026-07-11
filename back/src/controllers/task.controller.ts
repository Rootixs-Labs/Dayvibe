import type { Request, Response } from 'express';
import { taskService } from '../services/task.service.js';
import {
  createTaskSchema,
  updateTaskSchema,
  TaskIdParamSchema,
} from '../validators/task.validator.js';

// HTTP layer for the User entity: validates input, calls the service,
// and shapes the response. Holds no business logic.
export const taskController = {
      async list(_req: Request, res: Response) {
        const tasks = await taskService.findAll();
        res.json({ success: true, data: tasks });
      },
    
      async getById(req: Request, res: Response) {
        const { id } = TaskIdParamSchema.parse(req.params);
        const task = await taskService.findById(id);
        res.json({ success: true, data: task });
      },
    
      async create(req: Request, res: Response) {
        const data = createTaskSchema.parse(req.body);
        const task = await taskService.create(data);
        res.status(201).json({ success: true, data: task });
      },
    
      async update(req: Request, res: Response) {
        const { id } = TaskIdParamSchema.parse(req.params);
        const data = updateTaskSchema.parse(req.body);
        const task = await taskService.update(id, data);
        res.json({ success: true, data: task });
      },
    
      async remove(req: Request, res: Response) { 
        const { id } = TaskIdParamSchema.parse(req.params);
        await taskService.remove(id);
        res.status(204).send();
      },
};