// Imports
import { NextApiHandler } from 'next';

// Mock Middleware
const withAbsolutelyNothing = <T = unknown>(handler: NextApiHandler<T>): NextApiHandler<T> => {
    // Return handler as-is
    return handler;
};

// Exports
export default withAbsolutelyNothing;
