// Imports
import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import * as faker from 'faker';
import { Observable, of } from 'rxjs';

import { BookService } from '../app/book/book.service';
import { Book } from '../app/book/book';
import { BookPage } from '../app/book/book-page';
import { map } from 'rxjs/operators';

// Service
@Injectable({
    providedIn: 'root',
})
export class BookStubService implements Partial<BookService> {
    private readonly books: Book[];

    public constructor() {
        // Initialize book array
        this.books = [];

        // Generate 20 random books
        for (let i = 1; i <= 20; i++) {
            // Generate fake book data
            const bookData = {
                id: i,
                title: faker.random.words(3),
                author: faker.name.findName(),
                genre: faker.random.word(),
                year: faker.date.recent().getUTCFullYear(),
            };

            // Transform data into Book instance
            const book = plainToClass(Book, bookData);

            // Append book to array
            this.books.push(book);
        }
    }

    public getList(): Observable<Book[]> {
        // Wrap book listing inside observable
        return of(this.books);
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
