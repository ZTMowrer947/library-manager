// Imports
import http from 'http';
import { apiResolver } from 'next/dist/next-server/server/api-utils';
import request from 'supertest';

import handler from '..';
import BookService from '../../../../services/BookService';

// Jest Mocks
jest.mock('../../../../services/BookService');
jest.mock('../../../../middleware/withDatabaseConnection');

// Test Suite
describe('Book listing routes', () => {
    let service: BookService;

    beforeAll(() => {
        // Initailize book service
        // * This service is being mocked above, therefore connection object is not required
        service = new BookService(undefined as never);
    });

    describe('GET /api/books', () => {
        it('should respond with a list of books', async () => {
            // Define expected book listing
            const expected = (await service.getList()).map((book) => {
                const { version, ...bookDto } = book;

                return bookDto;
            });

            // Create HTTP server from API handler
            const server = http.createServer(async (req, res) => {
                return apiResolver(req, res, undefined, handler, undefined);
            });

            // Make API response and ensure status is 200
            const response = await request(server).get('/api/books').expect(200);

            // Expect response body to match expected book listing
            expect(response.body).toStrictEqual(expected);

            // Close HTTP server
            return server.close();
        });
    });

    describe('POST /api/books', () => {
        it.todo('should respond with a 400 error if the request body is invalid');

        it.todo('should respond with a 201 status if the book was successfully created');
    });

    it.todo('should respond with a 405 error when trying to use an unsupported method');
});
