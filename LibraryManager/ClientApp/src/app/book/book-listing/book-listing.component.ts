// Imports
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import range from 'lodash/range';
import { map, mergeMap } from 'rxjs/operators';

import { BookService } from '../book.service';
import { BookPage } from '../book-page';

// Component
@Component({
    selector: 'app-book-listing',
    templateUrl: './book-listing.component.html',
    styleUrls: ['./book-listing.component.scss'],
})
export class BookListingComponent implements OnInit {
    public bookPage: BookPage;

    public constructor(
        private activatedRoute: ActivatedRoute,
        private bookService: BookService
    ) {}

    public get pageRange(): number[] {
        return range(1, this.bookPage.totalPages + 1);
    }

    public ngOnInit() {
        this.activatedRoute.queryParamMap
            .pipe(
                map((queryMap) => {
                    // Get page attribute from query string
                    let page = Number.parseInt(queryMap.get('page'), 10);

                    // If page is not a number,
                    if (Number.isNaN(page)) {
                        // Reset to page 1
                        page = 1;
                    }

                    // Return normalized page
                    return page;
                }),

                // Fetch book data for selected page
                mergeMap((page) => this.bookService.getPage(page))
            )
            .subscribe((bookPage) => {
                this.bookPage = bookPage;
            });
    }
}
