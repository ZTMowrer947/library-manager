// Imports
import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';

import { BookService } from './book.service';
import { BookFakerService } from '../../testing/book-faker.service';
import { plainToClass, classToPlain } from 'class-transformer';
import { BookPage } from './book-page';

// Test Suite
describe('BookService', () => {
    let apiBaseUrl: string;
    let httpController: HttpTestingController;
    let bookFaker: BookFakerService;
    let service: BookService;

    beforeAll(() => {
        // Configure API base url
        apiBaseUrl = `${location.protocol}//${location.host}`;
    });

    beforeEach(() => {
        // Configure testing module
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [BookFakerService],
        });

        // Get HTTP Testing Controller and book faker
        httpController = TestBed.get(HttpTestingController);
        bookFaker = TestBed.get(BookFakerService);

        // Get service under test
        service = TestBed.get(BookService);
    });

    afterEach(() => {
        // Ensure no other requests are pending after each test
        httpController.verify();
    });

    describe('getPage', () => {
        it('should fetch a page of course data from the API', () => {
            // Define page number to fetch
            const page = 1;

            // Generate fake book listing
            const books = bookFaker.list(20);

            // Generate page data from listing
            const expected = plainToClass(BookPage, {
                page,
                itemsPerPage: 10,
                totalPages: Math.ceil(books.length / 10),
                data: books,
            });

            // Compute API endpoint URL
            const expectedUrl = `${apiBaseUrl}/api/Books?page=${page}`;

            // Retrieve page of book data from service
            service.getPage(page).subscribe((result) => {
                // Expect results to match fake data
                expect(result).toStrictEqual(expected);
            });

            // Expect one request at endpoint
            const req = httpController.expectOne(expectedUrl);

            // Expect request to be a GET request
            expect(req.request.method).toEqual('GET');

            // Respond with mock page data
            req.flush(classToPlain(expected));
        });
    });

    describe('get', () => {
        it('should request book with the given ID and return it if found', () => {
            // Generate random ID and book data
            const id = Math.floor(Math.random() * 19) + 1;
            const testBook = bookFaker.book(id);

            // Compute API endpoint URL
            const expectedUrl = `${apiBaseUrl}/api/Books/${id}`;

            // Retrieve book data from service
            service.get(id).subscribe((resultBook) => {
                // Expect book from service to match test book
                expect(resultBook).toStrictEqual(testBook);
            });

            // Expect one request at endpoint
            const req = httpController.expectOne(expectedUrl);

            // Expect request to be a GET request
            expect(req.request.method).toEqual('GET');

            // Respond with mock book data
            req.flush(classToPlain(testBook));
        });

        it('should return null if book with given idea cannot be found', () => {
            // Use max integer value as ID
            const id = Number.MAX_SAFE_INTEGER;

            // Compute API endpoint URL
            const expectedUrl = `${apiBaseUrl}/api/Books/${id}`;
            // Retrieve book data from service
            service.get(id).subscribe((resultBook) => {
                // Expect service to return undefined
                expect(resultBook).toBeUndefined();
            });

            // Expect one request at endpoint
            const req = httpController.expectOne(expectedUrl);

            // Expect request to be a GET request
            expect(req.request.method).toEqual('GET');

            // Respond with 404 error
            req.flush('Not Found', {
                status: 404,
                statusText: 'Not Found',
            });
        });
    });
});
