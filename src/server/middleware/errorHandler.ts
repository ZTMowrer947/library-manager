// Imports
import { Middleware } from "koa";

// Middleware
const errorHandler: Middleware = async (ctx, next) => {
    try {
        // Process middleware chain
        await next();
    } catch (error) {
        // If an error is thrown,

        // If status code has not been set yet,
        if (ctx.status < 400) {
            // Set it to 500
            ctx.status = 500;
        }

        // If status code is 404,
        if (ctx.status === 404) {
            // Render not found page
            await ctx.render("notfound");
        } else {
            // Otherwise, render error page
            await ctx.render("error");
        }

        // Emit error event on app
        ctx.app.emit("error", error);
    }
};

// Export
export default errorHandler;
