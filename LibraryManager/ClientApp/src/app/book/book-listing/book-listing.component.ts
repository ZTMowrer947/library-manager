// Imports
import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { BookPage } from '../book-page';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';

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
