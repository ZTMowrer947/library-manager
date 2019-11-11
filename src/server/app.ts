// Imports
import path from "path";
import Koa from "koa";
import views from "koa-views";
import router from "./routes";
import env, { EnvType } from "./env";

// Paths
const basePath = path.resolve(__dirname, "..", "..");
const viewsPath = path.resolve(basePath, "views");

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

        // Load asset data
        app.use(async ctx => {
            // Create promise for reading file from memory filesystem
            const readFileAsync = (path: string): Promise<Buffer> =>
                new Promise((resolve, reject) => {
                    middleware.devMiddleware.fileSystem.readFile(
                        path,
                        (error, result) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(result);
                            }
                        }
                    );
                });

            // Read asset file
            const assetBytes = await readFileAsync(
                path.resolve(basePath, "dist", "assets.json")
            );

            // Parse data as JSON string
            const assets = JSON.parse(assetBytes.toString());

            // Attach asset data to state
            ctx.state.assets = assets;
        });
    }

    // Routes
    app.use(router.routes());
    app.use(router.allowedMethods());
})();

// Export
export default app;
