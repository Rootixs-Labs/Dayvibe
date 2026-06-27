import { prisma } from '../lib/prisma.js';
import { ApiError } from '../utils/ApiError.js';
import type {
  CreateRegisterInput,
} from '../validators/register.validator.js';

// Business logic and database access for the User entity.
// Throws ApiError for expected failures so controllers stay thin.
export const registerService = {


  // Creates a user, rejecting duplicate emails with a 409.
  async create(data: CreateRegisterInput) {
    const existingEmail = await prisma.user.findUnique({
      where: { email: data.email },

    });
    if (existingEmail)  {
      throw ApiError.conflict(`Email ${data.email} is already in use`);
    }
    return prisma.user.create({ data });
  },
};