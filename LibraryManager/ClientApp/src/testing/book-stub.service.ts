// Imports
import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import * as faker from 'faker';
import { Observable, of } from 'rxjs';

import { BookService } from '../app/book/book.service';
import { Book } from '../app/book/book';

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

    public get(id: number): Observable<Book> {
        // Attempt to find book with ID
        const bookWithId = this.books.find((book) => book.id === id);

        // Return book wrapped inside observable
        return of(bookWithId);
    }
}
