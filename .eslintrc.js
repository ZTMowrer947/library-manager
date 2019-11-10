// ESLint Configuration
module.exports = {
    // Parser
    parser: "@typescript-eslint/parser",

    // Plugins
    plugins: ["@typescript-eslint", "prettier"],

    // Ruleset extensions
    extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
        "prettier/@typescript-eslint",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
    ],

    // Environment
    env: {
        node: true,
        browser: true,
        es6: true,
    },

    // Rules
    rules: {
        "@typescript-eslint/explicit-function-return-type": [
            "warn",
            {
                allowExpressions: true,
                allowTypedFunctionExpressions: true,
            },
        ],

        "import/order": ["error"],
    },

    // Rule overrides
    overrides: [
        {
            // JavaScript files
            files: ["*.js"],
            rules: {
                // Disable rules that shouldn't apply to ES5 JS files
                "@typescript-eslint/no-var-requires": ["off"],
                "@typescript-eslint/explicit-function-return-type": ["off"],
            },
        },
    ],
};
