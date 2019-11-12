// Imports
import { getConnection } from "typeorm";
import app from "./app";
import ormBootstrap from "./database";
import http from "http";

// Variables
let server: http.Server;

// Run before all tests
beforeAll(async () => {
    // Setup database connection
    await ormBootstrap();

    // Initialize HTTP server
    server = http.createServer(app.callback());

    // Listen on port 53035
    server.listen(53035);
});

// Run after all tests
afterAll(async () => {
    // Close HTTP server
    server.close();

    // Get database connection
    const connection = getConnection();

    // Close connection
    await connection.close();
});
