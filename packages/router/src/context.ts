import { initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { createDatabaseClient } from '@afiado/db'


export const createContext = async ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  const db = createDatabaseClient()

  return {
    req,
    res,
    db,
  };
};

type Context = Awaited<ReturnType<typeof createContext>>;

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<Context>().create();

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;
