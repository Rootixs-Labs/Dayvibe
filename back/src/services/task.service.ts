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
  async findTaskById(id: string) {
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task) {
      throw ApiError.notFound(`task ${id} not found`);
    }
    return task;
  },

  // Creates a task, rejecting duplicate titles on same user id with a 409.
  async create(data: CreateTaskInput) {
    const existing = await prisma.task.findFirst({
      where: { title: data.title, userId : data.userId },
    });
    if (existing) {
      throw ApiError.conflict(`${data.title} already exists as a task`);
    }
    return prisma.task.create({ data });
  },

  // Updates an existing task, ensuring it exists first for a clean 404.
  async update(id: string, data: UpdateTaskInput) {
    await taskService.findTaskById(id);
    return prisma.task.update({ where: { id }, data });
  },

  // Deletes an existing task, ensuring it exists first for a clean 404.
  async remove(id: string) {
    await taskService.findTaskById(id);
    await prisma.task.delete({ where: { id } });
  },
};