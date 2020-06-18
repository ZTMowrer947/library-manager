// Imports
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { plainToClass } from 'class-transformer';
import { Observable, of, throwError, EMPTY } from 'rxjs';
import { map, catchError, switchMapTo } from 'rxjs/operators';

import { Book } from './book';
import { BookPage } from './book-page';
import { BookCreateViewmodel } from './book-create-viewmodel';
import { ApiValidationError } from '../error/api-validation-error';

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

    public create(bookData: BookCreateViewmodel): Observable<never> {
        // Attempt to create book using API
        return this.httpClient.post(`${this.apiUrl}/api/Books`, bookData).pipe(
            // If successful, map to empty observable
            switchMapTo(EMPTY),

            // Catch errors
            catchError((error: HttpErrorResponse) => {
                // If response code is 400,
                if (error.status === 400) {
                    // Retrieve validation errors from body
                    const validationErrors: Record<string, string[]> =
                        error.error.errors;

                    // Extract first error for each invalid property
                    const normalizedErrors = Object.keys(
                        validationErrors
                    ).reduce((errorMap, key) => {
                        return {
                            ...errorMap,
                            [key.toLowerCase()]: validationErrors[key][0],
                        };
                    }, {} as Record<string, string>);

                    // Create ApiValidationError
                    const validationError = new ApiValidationError(
                        normalizedErrors
                    );

                    // Throw validation error
                    return throwError(validationError);
                }

                // Otherwise, rethrow error
                return throwError(error);
            })
        );
    }
}
