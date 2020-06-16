// Imports
import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../book';

// Component
@Component({
    selector: 'app-book-listing',
    templateUrl: './book-listing.component.html',
    styleUrls: ['./book-listing.component.scss'],
})
export class BookListingComponent implements OnInit {
    public books: Book[] = [];

    public constructor(private bookService: BookService) {}

    public ngOnInit() {
        this.bookService.getList().subscribe((books) => {
            this.books = books;
        });
    }
}
