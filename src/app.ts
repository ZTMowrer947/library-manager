// Imports
import Koa from "koa";

// App setup
const app = new Koa();

// Test route
app.use(async ctx => {
    ctx.type = "xml";
    ctx.body = `<?xml version="1.0"?><message>Hello, World!</message>`;
});

// Export
export default app;
