// Imports
const path = require("path");

// Environment configuration
const nodeEnv = process.env.NODE_ENV || "development";
const env = (() => {
    switch (nodeEnv) {
        case "prod":
        case "production":
            return "production";

        case "staging":
        case "testing":
        case "test":
            return "testing";

        default:
            return "development";
    }
})();

// Environment-dependent configuration options
const basePath = path.resolve(
    __dirname,
    env === "production" ? "dist" : "src",
    "database"
);
const dbFile =
    env === "testing" ? ":memory" : path.resolve(basePath, "library.db");
const migrationsRun = env === "production";
const synchronize = !migrationsRun;

// Configuration
/**
 * @type {import("typeorm").ConnectionOptions}
 */
const connectionOptions = {
    // Use SQLite database
    type: "sqlite",

    // Database path
    database: dbFile,

    // Directory paths
    entities: [path.resolve(basePath, "entities", "**", "*.entity.ts")],
    migrations: [path.resolve(basePath, "migrations", "**", "*.ts")],

    cli: {
        entitiesDir: path.resolve(basePath, "entities"),
        migrationsDir: path.resolve(basePath, "migrations"),
    },

    // Database sync options
    migrationsRun,
    synchronize,
};

// Export
module.exports = connectionOptions;
