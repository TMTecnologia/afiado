import { router } from './context';
import { helloRouter } from './hello';
import { usersRouter } from './users';

export * from './context';

export const appRouter = router({
  hello: helloRouter,
  users: usersRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
