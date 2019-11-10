// Imports
import path from "path";
import Koa from "koa";
import views from "koa-views";

// Paths
const viewsPath = path.resolve(__dirname, "..", "views");

// App setup
const app = new Koa();

// Middleware
app.use(
    views(viewsPath, {
        extension: "pug",
    })
);

// Test route
app.use(async ctx => {
    await ctx.render("index");
});

// Export
export default app;
