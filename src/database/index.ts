// Imports
import { createConnection } from "typeorm";

// Bootstrap function
const ormBootstrap = async (): Promise<void> => {
    await createConnection();
};

// Export
export default ormBootstrap;
