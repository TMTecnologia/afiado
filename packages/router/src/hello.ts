import { publicProcedure, router } from "./context";

export const helloRouter = router({
  hello: publicProcedure.query(() => 'Hello World using Bun & TRPC & Express'),
  ping: publicProcedure.query(() => 'Pong'),
});
