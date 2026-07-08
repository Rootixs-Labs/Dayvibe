import { prisma } from "../lib/prisma.js";
import { ApiError } from "../utils/ApiError.js";
import type { UpdateProfileInput } from "../validators/profile.validator.js";

// Business logic and database access for the Profile entity.
// Throws ApiError for expected failures so controllers stay thin.
export const profileService = {
  // Returns a single profile or throws a 404 if it does not exist.
  async findById(id: string) {
    const profile = await prisma.profile.findUnique({ where: { id } });
    if (!profile) {
      throw ApiError.notFound(`Profile ${id} not found`);
    }
    return profile;
  },

  // Updates an existing profile, ensuring it exists first for a clean 404.
  async update(id: string, data: UpdateProfileInput) {
    await profileService.findById(id);
    return prisma.profile.update({ where: { id }, data });
  },
};
