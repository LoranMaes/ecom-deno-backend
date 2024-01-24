import { Router } from "https://deno.land/x/oak@v12.6.2/mod.ts";
import { getUser, signin, signup } from "../users.ts";
import {
  authorized,
  hasShop,
  isLoggedIn,
} from "../middlewares/authorization.ts";

const router = new Router();

router.get("/api/", ({ response }: { response: any }) => {
  response.body = "Rawr, I'm a dinosaur! 🦖 ";
  response.status = 200;
});

router
  .post("/api/signup", isLoggedIn, async (context) => {
    await signup({ request: context.request, response: context.response });
  })
  .post("/api/signin", isLoggedIn, async (context) => {
    await signin({ req: context.request, res: context.response });
  })
  .get("/api/user", authorized, async (context) => {
    await getUser({ req: context.request, res: context.response });
  })
  .post("/api/shop", hasShop, async (context) => {
    return;
  });

export default router;
