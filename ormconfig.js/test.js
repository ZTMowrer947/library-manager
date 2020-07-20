// Imports
const path = require('path');

const { projectSourceDir, projectRootDir } = require('./paths');

// Database paths
const entitiesDir = path.resolve(projectSourceDir, 'entities');

/**
 * @type {import("typeorm").ConnectionOptions}
 */
// TypeORM configuration for testing environments
const testConfig = {
    // Connection name
    name: 'test',

    // Use SQLite database
    type: 'sqlite',

    // Use in-memory database
    database: ':memory:',

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
