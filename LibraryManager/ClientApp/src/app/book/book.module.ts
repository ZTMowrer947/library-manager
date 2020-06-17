// Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookService } from './book.service';
import { BookListingComponent } from './book-listing/book-listing.component';
import { BookRoutingModule } from './book-routing.module';
import { BookDetailComponent } from './book-detail/book-detail.component';

// Module
@NgModule({
    declarations: [BookListingComponent, BookDetailComponent],
    imports: [CommonModule, BookRoutingModule],
    providers: [BookService],
})
export class BookModule {}
