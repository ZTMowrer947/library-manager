// Imports
import http from 'http';
import { apiResolver } from 'next/dist/next-server/server/api-utils';
import request from 'supertest';

import handler from '..';
import BookService from '../../../../services/BookService';
import BookCreateDto from '../../../../dto/BookCreateDto';
import BookDto from '../../../../dto/BookDto';

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
                return apiResolver(req, res, undefined, handler, {
                    previewModeId: '',
                    previewModeEncryptionKey: '',
                    previewModeSigningKey: '',
                });
            });

            // Make API response, expecting a 200 response
            const response = await request(server).get('/api/books').expect(200);

            // Expect response body to match expected book listing
            expect(response.body).toStrictEqual(expected);

            // Close HTTP server
            return server.close();
        });
    });

    describe('POST /api/books', () => {
        it('should respond with a 400 error if the request body is invalid', async () => {
            // Create HTTP server from API handler
            const server = http.createServer(async (req, res) => {
                return apiResolver(req, res, undefined, handler, {
                    previewModeId: '',
                    previewModeEncryptionKey: '',
                    previewModeSigningKey: '',
                });
            });

            // Make API response with empty body, expecting a 400 response
            const response = await request(server).post('/api/books').send({}).expect(400);

            // Expect response body to contain errors property
            expect(response.body).toHaveProperty('errors');

            // Close HTTP server
            return server.close();
        });

        it('should respond with a 201 status if the book was successfully created', async () => {
            // Define book data to send to server
            const bookData: BookCreateDto = {
                title: 'Testing Next.js APIs with Jest',
                author: 'Zane Morris',
                genre: 'Informational',
                year: 2020,
            };

            // Create HTTP server from API handler
            const server = http.createServer(async (req, res) => {
                return apiResolver(req, res, undefined, handler, {
                    previewModeId: '',
                    previewModeEncryptionKey: '',
                    previewModeSigningKey: '',
                });
            });

            // Make API response with book data as request body, expecting a 201 response
            const response = await request(server).post('/api/books').send(bookData).expect(201);

            const newBook = response.body as BookDto;

            // Expect book to be fetchable by ID
            await expect(service.get(newBook.id)).resolves.not.toBeNull();

            // Construct expected location header
            const expectedLocation = `/api/books/${newBook.id}`;

            // Expect location header be set as expected
            expect(response.header).toHaveProperty('location', expectedLocation);

            // Close HTTP server
            return server.close();
        });
    });

    it('should respond with a 405 error when trying to use an unsupported method', async () => {
        // Create HTTP server from API handler
        const server = http.createServer(async (req, res) => {
            return apiResolver(req, res, undefined, handler, {
                previewModeId: '',
                previewModeEncryptionKey: '',
                previewModeSigningKey: '',
            });
        });

        // Make API request with invalid method, expecting a 405 response
        const response = await request(server).propfind('/api/books').expect(405);

        // Expect endpoint to only allow GET and POST request
        expect(response.header).toHaveProperty('allow', 'GET, POST');

        // Close HTTP server
        return server.close();
    });
});
