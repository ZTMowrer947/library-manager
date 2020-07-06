// Imports
import { NextApiRequest, NextApiResponse } from 'next';
import { Connection } from 'typeorm';

import initializeDatabase from '../initializeDatabase';

// Helper types
export interface NextDatabaseApiRequest extends NextApiRequest {
    db: Connection;
}

export type NextDatabaseApiHandler<T = any> = (req: NextDatabaseApiRequest, res: NextApiResponse<T>) => void | Promise<void>;

// Middleware
function withDatabaseConnection<T = any>(handler: NextDatabaseApiHandler<T>): NextDatabaseApiHandler<T> {
    return async (req, res) => {
        // Create database connection and attach to request
        req.db = await initializeDatabase();

        try {
            // Delegate to handler
            await handler(req, res);
        } finally {
            // In any case, close connection when done
            await req.db.close();
        }
    };
}

// Exports
export default withDatabaseConnection;
