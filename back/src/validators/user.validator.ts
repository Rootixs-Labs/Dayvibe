import { z } from 'zod';

// Body schema for creating a user. Required fields mirror the Prisma model.
export const createUserSchema = z.object({
  email: z.email(),
  passwordHash: z.string().min(1),
});

// Body schema for updating a user. Every field is optional so callers
// can send a partial update.
export const updateUserSchema = z.object({
  email: z.email().optional(),
  passwordHash: z.string().optional(),

});

// Param schema for routes that target a single user by id.
export const userIdParamSchema = z.object({
  id: z.string().min(1),
});

// Types inferred from the schemas, reused as the service input types
// so validation and business logic never drift apart.
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
