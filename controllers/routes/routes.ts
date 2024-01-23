import { Router } from "https://deno.land/x/oak@v12.6.2/mod.ts";
import { getUser, signin, signup } from "../users.ts";

const router = new Router();

router.get("/api/", ({ response }: { response: any }) => {
  response.body = "Rawr, I'm a dinosaur! 🦖 ";
  response.status = 200;
});

router
  .post("/api/signup", async (context) => {
    await signup({ request: context.request, response: context.response });
  })
  .post("/api/signin", async (context) => {
    await signin({ req: context.request, res: context.response });
  })
  .get("/api/user", async (context) => {
    await getUser({ req: context.request, res: context.response });
  });

export default router;
