// Imports
import 'reflect-metadata';
import { createConnection, getConnectionOptions, Connection } from 'typeorm';
import BookEntity from './entities/BookEntity';

// Determine name of connection to initialize
function selectConnectionName(): string {
    switch (process.env.NODE_ENV) {
        case 'production':
            return 'prod';

        case 'development':
            return 'dev';

        default:
            return process.env.NODE_ENV ?? 'dev';
    }
}

// Database initializer
const initializeDatabase = async (): Promise<Connection> => {
    // Get name of connection to create
    const name = selectConnectionName();

    // Get base configuration options for that option
    const baseConfig = await getConnectionOptions(name);

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
