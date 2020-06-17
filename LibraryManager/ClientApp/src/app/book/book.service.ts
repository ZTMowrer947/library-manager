// Imports
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { plainToClass } from 'class-transformer';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Book } from './book';
import { BookPage } from './book-page';

// Service
@Injectable({
    providedIn: 'root',
})
export class BookService {
    public constructor(private httpClient: HttpClient) {}

    private get apiUrl(): string {
        return `${location.protocol}//${location.host}`;
    }

    public getPage(page: number): Observable<BookPage> {
        // Retrieve page of book data from API
        return this.httpClient
            .get(`${this.apiUrl}/api/Books?page=${page}`)
            .pipe(map((body) => plainToClass(BookPage, body)));
    }

    public get(id: number): Observable<Book> {
        // Attempt to retrieve book from API
        return this.httpClient.get(`${this.apiUrl}/api/Books/${id}`).pipe(
            map((body) => plainToClass(Book, body)),
            catchError((error: HttpErrorResponse) => {
                // If error status is 404,
                if (error.status === 404) {
                    // Return undefined wrapped inside observable
                    return of(undefined);
                }

                // Otherwise, rethrow error
                return throwError(error);
            })
        );
    }
}
