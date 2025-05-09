import { corsRouter } from "convex-helpers/server/cors";
import { httpRouter } from "convex/server";
import { addEmailToWaitlistHttp } from "./waitlist";

const http = httpRouter();
const cors = corsRouter(http);

const ALLOWED_ORIGINS = process.env.CONVEX_ALLOWED_ORIGINS?.split(";") ?? [];

cors.route({
  path: "/waitlist",
  method: "POST",
  handler: addEmailToWaitlistHttp,
  allowedOrigins: ALLOWED_ORIGINS,
});

export default cors.http;
