import { Router } from "https://deno.land/x/oak/mod.ts";
import { signup } from "../users.ts";

const router = new Router();

router.get("/api/", ({ response }: { response: any }) => {
  response.body = "Rawr, I'm a dinosaur! 🦖 ";
  response.status = 200;
});

router.post("/api/signup", signup);

export default router;
