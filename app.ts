import { Application } from "https://deno.land/x/oak@v12.6.2/mod.ts";
import router from "./controllers/routes/routes.ts";
import {
  jwtMiddleware,
  OnSuccessHandler,
} from "https://raw.githubusercontent.com/halvardssm/oak-middleware-jwt/master/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
const PORT = 8080;

interface ApplicationState {
  userId: string;
}
const app = new Application<ApplicationState>();

const onSucces: OnSuccessHandler = (ctx: any, next: any) => {
  ctx.state.userId = ctx.state.jwt.payload.userId;
  next();
};

app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Application is listening on port: ${PORT}`);

await app.listen({ port: PORT });
