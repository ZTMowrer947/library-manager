// Imports
const fs = require('fs');
const path = require('path');

const baseConfig = require('./base');
const { projectSourceDir, projectRootDir } = require('./paths');

// Database paths
const entitiesDir = path.resolve(projectSourceDir, 'entities');
const migrationsDir = path.resolve(projectSourceDir, 'migrations');

/**
 * @type {import("typeorm").ConnectionOptions}
 */
// TypeORM configuration for development environments
const devConfig = {
    ...baseConfig,

    // Connection name
    name: 'dev',

    // Enable database logging
    logging: true,

    // Entity path
    entities: [path.resolve(entitiesDir, '**', '*.ts')],

    // CLI config
    cli: {
        entitiesDir: path.relative(projectRootDir, entitiesDir),
        migrationsDir: path.relative(projectRootDir, migrationsDir),
    },
};

// Exports
module.exports = devConfig;
