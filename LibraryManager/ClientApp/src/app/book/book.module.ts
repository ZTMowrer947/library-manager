// Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BookService } from './book.service';
import { BookListingComponent } from './book-listing/book-listing.component';

// Module
@NgModule({
    declarations: [BookListingComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: 'books',
                component: BookListingComponent,
                pathMatch: 'full',
            },
        ]),
    ],
    providers: [BookService],
})
export class BookModule {}
