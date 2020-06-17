// Imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookListingComponent } from './book-listing/book-listing.component';

// Routes
const routes: Routes = [
    {
        path: 'books',
        component: BookListingComponent,
        pathMatch: 'full',
    },
];

// Routing module
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BookRoutingModule {}
