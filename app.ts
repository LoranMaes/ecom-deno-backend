import { Application } from "https://deno.land/x/oak/mod.ts";
import router from "./controllers/routes/routes.ts";

const app = new Application();
const PORT = 8000;

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Application is listening on port: ${PORT}`);

await app.listen({ port: PORT });
