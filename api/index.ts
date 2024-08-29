import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import { createContext, publicProcedure, router } from './trpc';

const DEFAULT_LISTEN_PORT = 3000

const appRouter = router({
  hello: publicProcedure.query(() => 'Hello World using Bun & TRPC & Express'),
  ping: publicProcedure.query(() => 'Pong'),
});

const app = express();

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

app.listen(DEFAULT_LISTEN_PORT, () => {
  console.log(`Example app listening on port ${DEFAULT_LISTEN_PORT}`)
});

export type AppRouter = typeof appRouter;

