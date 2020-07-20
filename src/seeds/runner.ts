// Imports
import BookEntity from '../entities/BookEntity';
import initializeDatabase from '../initializeDatabase';
import bookSeed from './bookSeed';

// Seed runner
async function run(): Promise<void> {
    // Initialize database connection
    const connection = await initializeDatabase();

    try {
        // Count books in database
        const bookCount = await connection.manager.count(BookEntity);

        // If there are any books,
        if (bookCount > 0) {
            // Skip seed
            console.log(`Books already in database, skipping ${bookSeed.name} seed...`);

            return;
        }

        // Otherwise, seed database
        console.log(`Running seed "${bookSeed.name}"...`);

        await bookSeed.run(connection);

        console.log(`Completed seed "${bookSeed.name}".`);
    } finally {
        // Close database connection
        await connection.close();
    }
}

// Execute runner
run()
    .then(() => {
        console.log('Seeding complete.');
        process.exit(0);
    })
    .catch((error: Error) => {
        console.error(`Seeding error: ${error.stack ?? error.message}`);
        process.exit(1);
    });
