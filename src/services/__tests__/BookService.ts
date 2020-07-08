// Imports
import { Connection, Repository } from 'typeorm';

import BookCreateDto from '@/dto/BookCreateDto';
import BookEntity from '@/entities/BookEntity';
import initializeDatabase from '@/initializeDatabase';
import Book from '@/models/Book';
import BookService from '@/services/BookService';

// Test Suite
describe('Book service', () => {
    let databaseConnection: Connection;
    let repository: Repository<Book>;
    let service: BookService;

    beforeAll(async () => {
        // Initialize database connection
        databaseConnection = await initializeDatabase();

        // Get book repository
        repository = databaseConnection.getRepository<Book>(BookEntity);

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
            const expected = await repository.find();

            // Retrieve actual listing from service
            const actual = await service.getList();

            // Expect listings to match
            expect(actual).toStrictEqual(expected);
        });
    });

    describe('.get', () => {
        it('should retrieve data for a book with the given ID', async () => {
            // Get the ID of a book in the database
            const { id } = await repository.createQueryBuilder('book').select('book.id', 'id').getRawOne<{ id: number }>();

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

    describe('.create', () => {
        it('should return the created book data', async () => {
            // Define book input data
            const bookData: BookCreateDto = {
                title: "Testin' with Jest",
                author: 'Zane Morris',
                genre: 'Informational',
                year: 2020,
            };

            // Create book through service
            const newBook = await service.create(bookData);

            // Expect created book to match input data
            expect(newBook.title).toBe(bookData.title);
            expect(newBook.author).toBe(bookData.author);
            expect(newBook.genre).toBe(bookData.genre);
            expect(newBook.year).toBe(bookData.year);

            // Expect new book to be retrievable from database and to match created book
            await expect(repository.findOne(newBook.id)).resolves.toStrictEqual(newBook);

            // Delete book
            return repository.remove(newBook);
        });
    });

    describe('.update', () => {
        it('should update an already existing entity', async () => {
            // Define book input data
            const bookData: BookCreateDto = {
                title: "Testin' with Jest",
                author: 'Zane Morris',
                genre: 'Informational',
                year: 2020,
            };

            // Save book in database
            const originalBook = await repository.save(bookData);

            // Define update data
            const updateData: BookCreateDto = {
                ...bookData,
                title: "Testin' with Jest, 2nd Edition",
                year: 2021,
            };

            // Use service to update book
            await expect(service.update(originalBook, updateData)).resolves.not.toThrow();

            // Fetch updated book data
            const updatedBook = await repository.findOneOrFail(originalBook.id);

            // Expect updated data to only match original data in terms of ID, author, and genre
            expect(updatedBook.id).toBe(originalBook.id);
            expect(updatedBook.version).toBeGreaterThan(originalBook.version);
            expect(updatedBook.title).not.toBe(originalBook.title);
            expect(updatedBook.author).toBe(originalBook.author);
            expect(updatedBook.genre).toBe(originalBook.genre);
            expect(updatedBook.year).not.toBe(originalBook.year);

            // Delete book
            await repository.remove(updatedBook);
        });
    });

    describe('.delete', () => {
        it('should delete the given book, such that it cannot be found again', async () => {
            // Define book input data
            const bookData: BookCreateDto = {
                title: "Testin' with Jest",
                author: 'Zane Morris',
                genre: 'Informational',
                year: 2020,
            };

            // Save book in database
            const bookToDelete: Book = await repository.save(bookData);

            // Extract ID from book
            const { id } = bookToDelete;

            // Use service to delete book
            await expect(service.delete(bookToDelete)).resolves.not.toThrow();

            // Expect attempts to retrieve book again to fail
            await expect(repository.findOne(id)).resolves.toBeUndefined();
        });
    });
});
