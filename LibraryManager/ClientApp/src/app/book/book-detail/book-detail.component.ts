// Imports
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../book';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap, switchMap } from 'rxjs/operators';

// Component
@Component({
    selector: 'app-book-detail',
    templateUrl: './book-detail.component.html',
    styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
    public book: Book;

    public constructor(
        private route: ActivatedRoute,
        private location: Location,
        private router: Router,
        private bookService: BookService
    ) {}

    public ngOnInit() {
        // Get book from ID in param map
        this.route.paramMap
            .pipe(
                // Extract ID from param map
                map((paramMap) => paramMap.get('id')),

                // Parse ID as number
                map((id) => Number.parseInt(id, 10)),

                // Fetch book with id
                switchMap((id) => this.bookService.get(id))
            )
            .subscribe((book) => {
                // If book was found,
                if (book) {
                    // Attach to component
                    this.book = book;
                } else {
                    // Otherwise, redirect to book listing
                    this.router.navigate(['books']);
                }
            });
    }

    public onCancel() {
        // Navigate to previous page
        this.location.back();
    }
}
