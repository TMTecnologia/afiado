import { helloRouter } from './hello';

import { router } from './context';
export * from './context';

export const appRouter = router({
  hello: helloRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
