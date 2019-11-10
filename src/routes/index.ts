// Imports
import { ParameterizedContext } from "koa";
import Router from "koa-router";

// Router setup
const router = new Router();

// Routes
router.get("/", async (ctx: ParameterizedContext) => {
    await ctx.render("index");
});

// Export
export default router;
