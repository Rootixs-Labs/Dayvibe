import { z } from "zod";

// Allowed enum values mirror the Prisma schema.
const themeSchema = z.enum(["DARK", "LIGHT", "SYSTEM"]);
const pronounSchema = z.enum(["HIM", "THEY", "HER", "ANON"]);

// Body schema for updating a profile. Every field is optional so callers
// can send a partial update. bio and pictureURL are nullable so they can
// be explicitly cleared (set to null), matching the optional columns in Prisma.
export const updateProfileSchema = z.object({
  bio: z.string().max(300).nullable().optional(),
  pictureURL: z.url().max(2048).nullable().optional(),
  theme: themeSchema.optional(),
  pronoun: pronounSchema.optional(),
});

// Param schema for routes that target a single profile by id.
export const profileIdParamSchema = z.object({
  id: z.string().min(1),
});

// Type inferred from the schema, reused as the service input type
// so validation and business logic never drift apart.
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
