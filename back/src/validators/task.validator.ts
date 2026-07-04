import { z } from 'zod';

// Body schema for creating a user. Required fields mirror the Prisma model.
export const createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  link: z.url({ protocol: /^https?$/ , normalize: true }).optional(),
});