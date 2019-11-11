// Imports
const path = require("path");
const AssetsPlugin = require("assets-webpack-plugin");

// Environment setup
const mode =
    process.env.NODE_ENV === "production" ? "production" : "development";

// Environment-specific values
const basePath = path.resolve(__dirname);
const entryPath = path.resolve(basePath, "src", "client");
const bundleSegment = mode === "production" ? "[contenthash]" : "bundle";
const moduleIds = mode === "production" ? "hashed" : "named";

// Plugins
const plugins = [
    new AssetsPlugin({
        filename: "assets.json",
        path: path.resolve(basePath, "dist"),
        keepInMemory: mode === "development",
    }),
];

// Configuration
/**
 * @type {import("webpack").Configuration}
 */
const webpackConfig = {
    // Mode
    mode,

    // Entry point
    entry: [path.resolve(entryPath, "index.ts")],

    // Output
    output: {
        // Filenames
        filename: path.join("scripts", `[name].${bundleSegment}.js`),

        // Paths
        path: path.resolve(basePath, "dist", "client"),
        publicPath: "/public",

        // Cross-origin loading
        crossOriginLoading: mode === "production" && "anonymous",
    },

    // Devtool
    devtool: mode === "production" ? "source-map" : "cheap-module-source-map",

    // Module rules
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "babel-loader",
                options: {
                    cacheDirectory: true,
                },
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader",
            },
        ],
    },

    // Optimizations
    optimization: {
        // Module IDs
        moduleIds,

        // Split runtime code into its own chunk
        runtimeChunk: "single",

        // Split chunks
        splitChunks: {
            // Group caching
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all",
                },
            },
        },
    },

    // Plugins
    plugins,

    // Loader resolution
    resolveLoader: {
        moduleExtensions: [path.resolve(basePath, "node_modules")],
    },
};

// Export
module.exports = webpackConfig;
