/* eslint-disable import/prefer-default-export */
// Imports
import { Connection } from 'typeorm';

// Interface
interface Seed {
    name: string;
    run: (connection: Connection) => Promise<void>;
}

// Exports
export type { Seed };
