import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";
import { prismaQueryInsights } from "@prisma/sqlcommenter-query-insights";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });

// Base client with the adapter. Do not export this: always use the extended `prisma` below.
const base = new PrismaClient({ adapter });

// Extend the client to guarantee the invariant:
// "every created user is born with a profile". No call site can forget it.
const prisma = base.$extends({
  query: {
    user: {
      async create({ args, query }) {
        // If the caller didn't define a profile, we inject one with defaults.
        // All profile fields are optional or have @default,
        // so `create: {}` produces a valid row.
        args.data.profile ??= { create: {} };
        return query(args);
      },
    },
  },
});

export { prisma };
