// Imports
import { createConnection } from "typeorm";
import env, { EnvType } from "../env";
import seed from "./seed";

// Bootstrap function
const ormBootstrap = async (): Promise<void> => {
    // Create database connection
    const connection = await createConnection();

    // If not in production,
    if (env !== EnvType.Production) {
        // Seed database
        await seed(connection);
    }
};

// Export
export default ormBootstrap;
