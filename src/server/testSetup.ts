// Imports
import { Container } from "typedi";
import { getConnection, useContainer } from "typeorm";
import app from "./app";
import ormBootstrap from "./database";
import http from "http";

// Variables
let server: http.Server;

// Run before all tests
beforeAll(async () => {
    // Configure TypeDI container
    useContainer(Container);

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
    const closeAsync = new Promise((resolve, reject) =>
        server.close(err => (err ? reject(err) : resolve()))
    );

    await closeAsync;

    // Get database connection
    const connection = getConnection();

    // Close connection
    await connection.close();
});
