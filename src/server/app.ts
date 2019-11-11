// Imports
import path from "path";
import Koa from "koa";
import views from "koa-views";
import router from "./routes";

// Paths
const viewsPath = path.resolve(__dirname, "..", "..", "views");

// App setup
const app = new Koa();

// Middleware
app.use(
    views(viewsPath, {
        extension: "pug",
    })
);

// Routes
app.use(router.routes());
app.use(router.allowedMethods());

// Export
export default app;
