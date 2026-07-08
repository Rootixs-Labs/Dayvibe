import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";
import { prismaQueryInsights } from "@prisma/sqlcommenter-query-insights";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter: adapter, comments: [prismaQueryInsights()] });

export { prisma };