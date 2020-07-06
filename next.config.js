module.exports = {
    webpack: (config, { webpack }) => {
        // Ignore test and mock files
        config.plugins.push(new webpack.IgnorePlugin(/[\\/]__(tests|mocks)__[\\/]/));

        return config;
    },
};
