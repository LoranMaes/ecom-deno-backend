import { Application } from "https://deno.land/x/oak@v12.6.2/mod.ts";
import router from "./controllers/routes/routes.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

const app = new Application();
const PORT = 8080;

app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Application is listening on port: ${PORT}`);

await app.listen({ port: PORT });
