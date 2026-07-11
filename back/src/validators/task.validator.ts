import { z } from 'zod';
import { Importance, OfType, Status } from '../generated/prisma/enums.js';

// Body schema for creating a task. Required fields mirror the Prisma model.
export const createTaskSchema = z.object({
  title: z.string().min(1),
  status: z.enum(Status),
  description: z.string().optional(),
  link: z.url({ protocol: /^https?$/ , normalize: true }).max(2048).optional(),
  importance: z.enum(Importance),
  ofType: z.enum(OfType),
  dueAt: z.date().optional(), 
  user: z.string(),
  userId: z.string(),
});

// Body schema for updating a user. Every field is optional so callers
// can send a partial update.
export const updateTaskSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  link: z.url({ protocol: /^https?$/ , normalize: true }).max(2048).optional(),
  importance: z.enum(Importance).optional(),
  ofType: z.enum(OfType).optional(),
  dueAt: z.date().optional(), 
});

// Param schema for routes that target a single task by id.
export const TaskIdParamSchema = z.object({
  id: z.string().min(1),
});

// Types inferred from the schemas, reused as the service input types
// so validation and business logic never drift apart.
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;