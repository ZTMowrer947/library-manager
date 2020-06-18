// Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BookService } from './book.service';
import { BookListingComponent } from './book-listing/book-listing.component';
import { BookRoutingModule } from './book-routing.module';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { NewBookComponent } from './new-book/new-book.component';

// Module
@NgModule({
    declarations: [BookListingComponent, BookDetailComponent, NewBookComponent],
    imports: [CommonModule, ReactiveFormsModule, BookRoutingModule],
    providers: [BookService],
})
export class BookModule {}
