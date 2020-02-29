module.exports = api => {
    // Determine if we are in a development/testing environment
    const isDev = api.env(["development", "dev", "test", "testing", "staging"]);

    // Define presets
    const presets = [
        // Environment
        [
            "@babel/preset-env",
            {
                // Use builtins based on usage
                useBuiltIns: "usage",

                // Use core-js 3
                corejs: 3,

                // Target current node version
                targets: {
                    node: true,
                },
            },
        ],

        // TypeScript
        "@babel/preset-typescript",
    ];

    // Define plugins
    const plugins = [
        // TypeScript metadata
        "babel-plugin-transform-typescript-metadata",

        // Decorators
        ["@babel/plugin-proposal-decorators", { legacy: true }],

        // Class properties
        ["@babel/plugin-proposal-class-properties", { loose: true }],

        // Optional chaining
        "@babel/plugin-proposal-optional-chaining",

        // Nullish coalescing operator
        "@babel/plugin-proposal-nullish-coalescing-operator",

        // Dynamic imports for Node
        "babel-plugin-dynamic-import-node-babel-7",
    ];

    // If not in production, transform babel runtime
    if (isDev) plugins.push("@babel/transform-runtime");

    // Return configuration object
    return {
        presets,
        plugins,
    };
};
