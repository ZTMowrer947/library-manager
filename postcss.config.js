// Imports
const precss = require("precss");
const autoprefixer = require("autoprefixer");

// PostCSS configuration
module.exports = () => {
    // Base plugins
    const plugins = [precss, autoprefixer];

    return {
        plugins,
    };
};
