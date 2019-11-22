// Imports
import { Container } from "typedi";
import { getConnection, useContainer } from "typeorm";
import ormBootstrap from "./database";

// Run before all tests
beforeAll(async () => {
    // Configure TypeDI container
    useContainer(Container);

    // Setup database connection
    await ormBootstrap();
});

// Run after all tests
afterAll(async () => {
    // Get database connection
    const connection = getConnection();

    // Close connection
    await connection.close();
});
