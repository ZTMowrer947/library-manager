// Imports
import http from 'http';
import listen from 'test-listen';
import fetch from 'isomorphic-unfetch';

import BookCreateDto from '@/dto/BookCreateDto';
import BookDto from '@/dto/BookDto';
import Book from '@/models/Book';
import handler from '@/pages/api/books';
import BookService from '@/services/BookService';
import setupTestServer from '@/testutils/setupTestServer';

// Mock Setup
jest.mock('@/services/BookService');
jest.mock('@/middleware/withDatabaseConnection');

// Test Suite
describe('Book listing routes', () => {
    let service: BookService;
    let server: http.Server;
    let url: string;

    beforeAll(async () => {
        // Initailize book service
        // * This service is being mocked above, therefore connection object is not required
        service = new BookService(undefined as never);

        // Create HTTP server from API handler
        server = setupTestServer(handler);

        url = await listen(server);
    });

    afterAll((done) => {
        // Close server
        return server.close(done);
    });

    describe('GET /api/books', () => {
        it('should respond with a list of books', async () => {
            // Define expected book listing
            const expected = (await service.getList()).map((book) => {
                const { version, ...bookDto } = book;

                return bookDto;
            });

            // Make API request
            const response = await fetch(url);

            // Retrieve response body
            const body = (await response.json()) as Book[];

            // Expect response to be OK
            expect(response.ok).toBeTruthy();

            // Expect response body to match book listing
            expect(body).toStrictEqual(expected);
        });
    });

    describe('POST /api/books', () => {
        it('should respond with a 400 error if the request body is invalid', async () => {
            // Make API request with empty request body
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}),
            });

            // Retrieve response body
            const body = (await response.json()) as unknown;

            // Expect response to not be OK and have 400 status
            expect(response.ok).toBeFalsy();
            expect(response.status).toBe(400);

            // Expect response body to contain errors property
            expect(body).toHaveProperty('errors');
        });

        it('should respond with a 201 status if the book was successfully created', async () => {
            // Define book data to send to server
            const bookData: BookCreateDto = {
                title: 'Testing Next.js APIs with Jest',
                author: 'Zane Morris',
                genre: 'Informational',
                year: 2020,
            };

            // Make API request with book data for request body
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookData),
            });

            // Retrieve response body
            const newBook = (await response.json()) as BookDto;

            // Expect response to be OK
            expect(response.ok).toBeTruthy();

            // Expect book to be fetchable by ID
            await expect(service.get(newBook.id)).resolves.not.toBeNull();

            // Construct expected location header
            const expectedLocation = `/api/books/${newBook.id}`;

            // Expect location header be set as expected
            expect(response.headers.has('location')).toBeTruthy();
            expect(response.headers.get('location')).toBe(expectedLocation);
        });
    });

    it('should respond with a 405 error when trying to use an unsupported method', async () => {
        // Make API request with invalid method
        const response = await fetch(url, {
            method: 'DELETE',
        });

        // Expect response to not be OK and have a 405 status
        expect(response.ok).toBeFalsy();
        expect(response.status).toBe(405);

        // Expect endpoint to only allow GET and POST request
        expect(response.headers.has('allow')).toBeTruthy();
        expect(response.headers.get('allow')).toBe('GET, POST');
    });
});
