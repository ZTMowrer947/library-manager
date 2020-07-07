// Imports
import { Connection } from 'typeorm';

import BookService from '../BookService';
import BookEntity from '../../entities/BookEntity';
import initializeDatabase from '../../initializeDatabase';
import Book from '../../models/Book';

// Test Suite
describe('Book service', () => {
    let service: BookService;
    let databaseConnection: Connection;

    beforeAll(async () => {
        // Initialize database connection
        databaseConnection = await initializeDatabase();

        // Initialize service under test
        service = new BookService(databaseConnection);
    });

    afterAll(async () => {
        // Close database connection
        await databaseConnection.close();
    });

    describe('.getList', () => {
        it('should retrieve book listing from database', async () => {
            // Retrieve expected listing from database
            const expected = await databaseConnection.manager.find<Book>(BookEntity);

            // Retrieve actual listing from service
            const actual = await service.getList();

            // Expect listings to match
            expect(actual).toStrictEqual(expected);
        });
    });

    describe('.get', () => {
        it('should retrieve data for a book with the given ID', async () => {
            // Get the ID of a book in the database
            const { id } = await databaseConnection
                .createQueryBuilder<Book>(BookEntity, 'book')
                .select('book.id', 'id')
                .getRawOne<{ id: number }>();

            // Retrieve expected book data from database
            const expected = await databaseConnection.manager.findOne<Book>(BookEntity, id);

            // Retrieve actual book data from service
            const actual = await service.get(id);

            // Expect book from service to not be null and to match database book
            expect(actual).not.toBeNull();
            expect(actual).toStrictEqual(expected);
        });

        it('should return null if no book exists with the given ID', async () => {
            // Define ID of book that does not exist
            const id = 2 ** 24 - 1;

            // Expect attempt to retrieve book from service to resolve to null value
            await expect(service.get(id)).resolves.toBeNull();
        });
    });
});
