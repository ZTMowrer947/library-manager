// Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookService } from './book.service';
import { BookListingComponent } from './book-listing/book-listing.component';
import { BookRoutingModule } from './book-routing.module';

// Module
@NgModule({
    declarations: [BookListingComponent],
    imports: [CommonModule, BookRoutingModule],
    providers: [BookService],
})
export class BookModule {}
