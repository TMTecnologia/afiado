import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import { createContext, appRouter } from '@afiado/router';

const DEFAULT_LISTEN_PORT = 3000
const PORT = process.env.PORT || DEFAULT_LISTEN_PORT

const app = express();

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

app.listen(PORT, () => {
  console.log(`Example app listening on http://localhost:${PORT}`)
});

export type AppRouter = typeof appRouter;

