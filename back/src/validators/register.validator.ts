import { z } from 'zod';

// Body schema for creating a user. Required fields mirror the Prisma model.
export const createRegisterSchema = z.object({
  email: z.email(),
  name: z.string().min(1).optional(),
});

// Body schema for updating a user. Every field is optional so callers
// can send a partial update.
export const updateRegisterSchema = z.object({
  email: z.email().optional(),
  name: z.string().min(1).optional(),
});

// Param schema for routes that target a single user by id.
export const RegisterIdParamSchema = z.object({
  id: z.string().min(1),
});

// Types inferred from the schemas, reused as the service input types
// so validation and business logic never drift apart.
export type CreateRegisterInput = z.infer<typeof createRegisterSchema>;
export type UpdateRegisterInput = z.infer<typeof updateRegisterSchema>;
