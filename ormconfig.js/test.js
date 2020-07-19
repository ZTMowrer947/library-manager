// Imports
const path = require('path');

const baseConfig = require('./base');
const { projectSourceDir, projectRootDir } = require('./paths');

// Database paths
const entitiesDir = path.resolve(projectSourceDir, 'entities');

/**
 * @type {import("typeorm").ConnectionOptions}
 */
// TypeORM configuration for testing environments
const testConfig = {
    ...baseConfig,

    // Connection name
    name: 'test',

    // Use SQLite database
    type: 'sqlite',

    // Use in-memory database
    database: ':memory:',

    // Remove database credentials (not needed for SQLite)
    username: undefined,
    password: undefined,

    // Disable TLS (not needed for SQLite)
    ssl: undefined,

    // Sync database schema
    synchronize: true,

    // Disable database logging
    logging: false,

    // CLI config
    cli: {
        entitiesDir: path.relative(projectRootDir, entitiesDir),
    },
};

// Exports
module.exports = testConfig;
