// Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookService } from './book.service';
import { BookListingComponent } from './book-listing/book-listing.component';
import { RouterModule } from '@angular/router';

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
