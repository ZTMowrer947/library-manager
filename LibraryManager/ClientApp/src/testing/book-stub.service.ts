// Imports
import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { BookFakerService } from './book-faker.service';
import { BookService } from '../app/book/book.service';
import { Book } from '../app/book/book';
import { BookPage } from '../app/book/book-page';

// Service
@Injectable({
    providedIn: 'root',
})
export class BookStubService implements Partial<BookService> {
    private readonly books: Book[];

    public constructor(private bookFaker: BookFakerService) {
        // Generate 20 random books
        this.books = bookFaker.list(20);
    }

    public getPage(page: number): Observable<BookPage> {
        // Calculate number of total pages
        const totalPages = Math.ceil(this.books.length / 10);

        // If page number is invalid, reset it to be within bounds
        if (page > totalPages) {
            page = totalPages;
        } else if (page < 1) {
            page = 1;
        }

        // Transform page number into page data
        return of(page).pipe(
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
        // Attempt to find book with ID
        const bookWithId = this.books.find((book) => book.id === id);

        // Return book wrapped inside observable
        return of(bookWithId);
    }
}
