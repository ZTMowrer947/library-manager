// Imports
import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { Observable, defer, EMPTY, throwError } from 'rxjs';
import { defaultIfEmpty, filter, map, take } from 'rxjs/operators';

import { BookFakerService } from './book-faker.service';
import { BookService } from '../app/book/book.service';
import { Book } from '../app/book/book';
import { BookPage } from '../app/book/book-page';
import { BookCreateViewmodel } from '../app/book/book-create-viewmodel';
import { ApiValidationError } from '../app/error/api-validation-error';

// Service
@Injectable({
    providedIn: 'root',
})
export class BookStubService implements Partial<BookService> {
    private readonly books: Book[];
    private nextId: number;

    public constructor(private bookFaker: BookFakerService) {
        // Generate 20 random books
        this.books = this.bookFaker.list(20);

        // Calculate highest total ID
        const highestId = this.books.reduce(
            (prevHigh, book) => (prevHigh > book.id ? prevHigh : book.id),
            1
        );

        // Use highest total to set next ID
        this.nextId = highestId + 1;
    }

    public getPage(page: number): Observable<BookPage> {
        // Calculate number of total pages
        const totalPages = Math.ceil(this.books.length / 10);

        // Generate page of data using listing and page number
        return defer(async () => {
            // If page number is invalid, reset it to be within bounds
            if (page > totalPages) {
                page = totalPages;
            } else if (page < 1) {
                page = 1;
            }

            // Return selected page number
            return page;
        }).pipe(
            // Calculate starting and ending indices
            map((pageNumber) => [(pageNumber - 1) * 10, pageNumber * 10]),

            // Get books between indices
            map(([start, end]) =>
                this.books.filter((_, index) => index >= start && index < end)
            ),

            // Map book data into page data
            map((data) => ({
                page,
                itemsPerPage: 10,
                totalPages,
                data,
            })),

            // Map page data into BookPage instance
            map((pageData) => plainToClass(BookPage, pageData))
        );
    }

    public get(id: number): Observable<Book> {
        // Pipe all books through observable
        return defer(() => this.books).pipe(
            // Filter out books that don't have the correct ID
            filter((book) => book.id === id),

            // Default to undefined if no book matches
            defaultIfEmpty(undefined),

            // Only emit first result
            take(1)
        );
    }

    public create(bookData: BookCreateViewmodel): Observable<never> {
        return defer(() => {
            // Define validation error object
            const validationErrors: Record<string, string> = {};

            // Ensure title and author are non-empty
            if (!bookData.title) {
                validationErrors.title = 'Title is required.';
            }

            if (!bookData.author) {
                validationErrors.author = 'Author is required';
            }

            // Check if there are any validation errors
            const hasErrors = Object.keys(bookData).some(
                (key) => key in validationErrors
            );

            // If there are no errors,
            if (!hasErrors) {
                // Transform book data into Book instance
                const newBook = plainToClass(Book, {
                    ...bookData,
                    id: this.nextId++,
                });

                // Append book to array
                this.books.push(newBook);

                // Complete observable
                return EMPTY;
            }

            // If there are errors, create ApiValidationError
            const error = new ApiValidationError(validationErrors);

            // Reject with error
            return throwError(error);
        });
    }
}
