// Imports
import http from 'http';
import { apiResolver } from 'next/dist/next-server/server/api-utils';
import request from 'supertest';

import BookCreateDto from '@/dto/BookCreateDto';
import BookDto from '@/dto/BookDto';
import handler from '@/pages/api/books';
import BookService from '@/services/BookService';

// Mock Setup
jest.mock('@/services/BookService');
jest.mock('@/middleware/withDatabaseConnection');

// Test Suite
describe('Book listing routes', () => {
    let service: BookService;
    let server: http.Server;

    beforeAll(() => {
        // Initailize book service
        // * This service is being mocked above, therefore connection object is not required
        service = new BookService(undefined as never);

        // Create HTTP server from API handler
        server = http.createServer(async (req, res) => {
            return apiResolver(req, res, undefined, handler, {
                previewModeId: '',
                previewModeEncryptionKey: '',
                previewModeSigningKey: '',
            });
        });
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

            // Make API response, expecting a 200 response
            const response = await request(server).get('/api/books').expect(200);

            // Expect response body to match expected book listing
            expect(response.body).toStrictEqual(expected);
        });
    });

    describe('POST /api/books', () => {
        it('should respond with a 400 error if the request body is invalid', async () => {
            // Make API response with empty body, expecting a 400 response
            const response = await request(server).post('/api/books').send({}).expect(400);

            // Expect response body to contain errors property
            expect(response.body).toHaveProperty('errors');
        });

        it('should respond with a 201 status if the book was successfully created', async () => {
            // Define book data to send to server
            const bookData: BookCreateDto = {
                title: 'Testing Next.js APIs with Jest',
                author: 'Zane Morris',
                genre: 'Informational',
                year: 2020,
            };

            // Make API response with book data as request body, expecting a 201 response
            const response = await request(server).post('/api/books').send(bookData).expect(201);

            const newBook = response.body as BookDto;

            // Expect book to be fetchable by ID
            await expect(service.get(newBook.id)).resolves.not.toBeNull();

            // Construct expected location header
            const expectedLocation = `/api/books/${newBook.id}`;

            // Expect location header be set as expected
            expect(response.header).toHaveProperty('location', expectedLocation);
        });
    });

    it('should respond with a 405 error when trying to use an unsupported method', async () => {
        // Make API request with invalid method, expecting a 405 response
        const response = await request(server).propfind('/api/books').expect(405);

        // Expect endpoint to only allow GET and POST request
        expect(response.header).toHaveProperty('allow', 'GET, POST');
    });
});
