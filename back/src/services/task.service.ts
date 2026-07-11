import { prisma } from '../lib/prisma.js';
import { ApiError } from '../utils/ApiError.js';
import type {
  CreateTaskInput,
  UpdateTaskInput,
} from '../validators/task.validator.js';

// Business logic and database access for the Tasks entity.
// Throws ApiError for expected failures so controllers stay thin.
export const taskService = {
  // Returns all users, newest first.
  async findAll() {
    return prisma.task.findMany({
        orderBy: { createdAt: 'desc' } });
  },

  // Returns a single task or throws a 404 if it does not exist.
  async findById(id: string) {
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task) {
      throw ApiError.notFound(`task ${id} not found`);
    }
    return task;
  },

  // Creates a user, rejecting duplicate emails with a 409.
  async create(data: CreateTaskInput) {
    const existing = await prisma.task.findUnique({
      where: { title: data.title },
    });
    if (existing) {
      throw ApiError.conflict(`Email ${data.email} is already in use`);
    }
    return prisma.user.create({ data });
  },

  // Updates an existing user, ensuring it exists first for a clean 404.
  async update(id: string, data: UpdateTaskInput) {
    await userService.findById(id);
    return prisma.user.update({ where: { id }, data });
  },

  // Deletes an existing user, ensuring it exists first for a clean 404.
  async remove(id: string) {
    await userService.findById(id);
    await prisma.user.delete({ where: { id } });
  },
};