// Imports
import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import * as faker from 'faker';
import range from 'lodash/range';

import { Book } from '../app/book/book';

// Service
@Injectable({
    providedIn: 'root',
})
export class BookFakerService {
    public list(length = 20): Book[] {
        // Generate fake book listing
        return range(1, length).map((id) => this.book(id));
    }

    public book(id: number) {
        // Generate fake book data
        const bookData = {
            id,
            title: faker.random.words(3),
            author: faker.name.findName(),
            genre: faker.random.word(),
            year: faker.date.recent().getUTCFullYear(),
        };

        // Transform data into Book instance
        const book = plainToClass(Book, bookData);

        // Return fake book
        return book;
    }
}
