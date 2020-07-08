// Imports
import listen from 'test-listen';
import fetch from 'isomorphic-unfetch';

import BookCreateDto from '@/dto/BookCreateDto';
import BookDto from '@/dto/BookDto';
import handler from '@/pages/api/books/[id]';
import BookService from '@/services/BookService';
import setupTestServer from '@/testutils/setupTestServer';

// Mock Setup
jest.mock('@/services/BookService');
jest.mock('@/middleware/withDatabaseConnection');

// Test Suite
describe('Book item routes', () => {
    let service: BookService;
    let id: number;

    beforeAll(async () => {
        // Initailize book service
        // * This service is being mocked above, therefore connection object is not required
        service = new BookService(undefined as never);

        // Define new book data
        const bookData: BookCreateDto = {
            title: 'Testing Next.js APIs with fetch',
            author: 'Zane Morris',
            genre: 'Informational',
            year: 2020,
        };

        // Create new book and extract ID
        id = (await service.create(bookData)).id;
    });

    describe('GET /api/books/[id]', () => {
        it('should respond with 422 status if given ID cannot be cast into an integer', async () => {
            // Create HTTP server from API handler
            const server = setupTestServer(handler, { id: 'invalid' });

            const url = await listen(server);

            // Make API request
            const response = await fetch(url);

            // Expect response to not be OK and to have 422 status
            expect(response.ok).toBeFalsy();
            expect(response.status).toBe(422);

            // Close HTTP server
            return server.close();
        });

        it('should respond with the data for the book with the given ID', async () => {
            // Create HTTP server from API handler
            const server = setupTestServer(handler, { id: id.toString() });

            const url = await listen(server);

            // Retrieve expected book data from service
            const expected = await service.get(id).then((book) => {
                if (!book) return book;

                // Convert Book to DTO
                const { version, ...bookDto } = book;

                // Return the DTO
                return bookDto;
            });

            // Make API request
            const response = await fetch(url);

            // Expect response to be OK
            expect(response.ok).toBeTruthy();

            // Get response body
            const actual = (await response.json()) as BookDto;

            // Expect response body to match book data from service
            expect(actual).toStrictEqual(expected);

            // Close HTTP server
            return server.close();
        });

        it('should respond with a 404 error if no book exists with the given ID', async () => {
            // Define ID of nonexistent book
            const nonexistentId = 2 ** 24 - 1;

            // Create HTTP server from API handler
            const server = setupTestServer(handler, { id: nonexistentId.toString() });

            const url = await listen(server);

            // Make API request
            const response = await fetch(url);

            // Expect response to not be OK and to have 404 status
            expect(response.ok).toBeFalsy();
            expect(response.status).toBe(404);

            // Parse response body as JSON
            const body = (await response.json()) as Record<string, unknown>;

            // Expect body to have correct message property
            expect(body).toHaveProperty('message', `No book exists with ID "${nonexistentId}"`);

            // Close HTTP server
            return server.close();
        });
    });

    describe('PUT /api/books/[id]', () => {
        it.todo('should respond with a 404 error if no book exists with the given ID');

        it.todo('should respond with a 400 error if the request body is invalid');

        it.todo('should respond with a 204 status if the book was successfully updated');
    });

    describe('DELETE /api/books/[id]', () => {
        it.todo('should respond with a 404 error if no book exists with the given ID');

        it.todo('should respond with a 400 error if the request body is invalid');

        it.todo('should respond with a 204 status if the book was successfully updated');
    });

    it.todo('should respond with a 405 error when trying to use an unsupported method');
});
