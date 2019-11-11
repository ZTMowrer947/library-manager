// Imports
import path from "path";
import Koa from "koa";
import views from "koa-views";
import router from "./routes";
import env, { EnvType } from "./env";

// Paths
const viewsPath = path.resolve(__dirname, "..", "..", "views");

// App setup
const app = new Koa();

(async () => {
    // Middleware
    app.use(
        views(viewsPath, {
            extension: "pug",
        })
    );

    // Asset setup

    // If we are in development mode,
    if (env === EnvType.Development) {
        // Import webpack packages
        const { default: koaWebpack } = await import("koa-webpack");
        const { default: webpack } = await import("webpack");
        const { default: webpackConfig } = await import("../../webpack.config");

        // Webpack compiler setup
        const compiler = webpack(webpackConfig);

        // Setup middleware
        const middleware = await koaWebpack({ compiler });

        // Apply middleware
        app.use(middleware);
    }

    // Routes
    app.use(router.routes());
    app.use(router.allowedMethods());
})();

// Export
export default app;
