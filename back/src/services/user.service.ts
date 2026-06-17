import { prisma } from '../lib/prisma.js';
import { ApiError } from '../utils/ApiError.js';
import type {
  CreateUserInput,
  UpdateUserInput,
} from '../validators/user.validator.js';

// Business logic and database access for the User entity.
// Throws ApiError for expected failures so controllers stay thin.
export const userService = {
  // Returns all users, newest first.
  async findAll() {
    return prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
  },

  // Returns a single user or throws a 404 if it does not exist.
  async findById(id: string) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw ApiError.notFound(`User ${id} not found`);
    }
    return user;
  },

  // Creates a user, rejecting duplicate emails with a 409.
  async create(data: CreateUserInput) {
    const existing = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existing) {
      throw ApiError.conflict(`Email ${data.email} is already in use`);
    }
    return prisma.user.create({ data });
  },

  // Updates an existing user, ensuring it exists first for a clean 404.
  async update(id: string, data: UpdateUserInput) {
    await userService.findById(id);
    return prisma.user.update({ where: { id }, data });
  },

  // Deletes an existing user, ensuring it exists first for a clean 404.
  async remove(id: string) {
    await userService.findById(id);
    await prisma.user.delete({ where: { id } });
  },
};
