// Imports
const path = require('path');

const baseConfig = require('./base');
const { projectDistDir, projectRootDir } = require('./paths');

// Database paths
const entitiesDir = path.resolve(projectDistDir, 'entities');
const migrationsDir = path.resolve(projectDistDir, 'migrations');

/**
 * @type {import("typeorm").ConnectionOptions}
 */
// TypeORM configuration for production environments
const prodConfig = {
    ...baseConfig,

    // Connection name
    name: 'prod',

    // Run migrations
    migrationsRun: true,

    // Enable database logging
    logging: true,

    // Entity and migration paths
    entities: [path.resolve(entitiesDir, '**', '*.ts')],
    migrations: [path.resolve(migrationsDir, '**', '*.js')],

    // CLI config
    cli: {
        entitiesDir: path.relative(projectRootDir, entitiesDir),
        migrationsDir: path.relative(projectRootDir, migrationsDir),
    },
};

// Exports
module.exports = prodConfig;
