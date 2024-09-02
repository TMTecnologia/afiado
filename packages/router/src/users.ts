import { publicProcedure, router } from "./context";

export const usersRouter = router({
  createUser: publicProcedure.query(async ({ ctx }) => { 
    const randomNameSuffix = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
    const name = `john#${randomNameSuffix}`
    await ctx.db.users.createUser({name, email: `${name}@email.com`})
  }),
});
