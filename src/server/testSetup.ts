// Imports
import { getConnection } from "typeorm";
import ormBootstrap from "./database";

// Run before all tests
beforeAll(async () => {
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
