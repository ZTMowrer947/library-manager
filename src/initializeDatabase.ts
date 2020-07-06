// Imports
import 'reflect-metadata';
import { createConnection, getConnectionOptions, Connection } from 'typeorm';
import BookEntity from './entities/BookEntity';

// Database initializer
const initializeDatabase = async (): Promise<Connection> => {
    // Get base configuration options
    const baseConfig = await getConnectionOptions();

    // Create database connection
    const connection = await createConnection({
        ...baseConfig,
        entities: [BookEntity],
    });

    // Return the connection
    return connection;
};

// Exports
export default initializeDatabase;
