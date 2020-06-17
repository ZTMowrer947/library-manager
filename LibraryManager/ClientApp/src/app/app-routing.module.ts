// Imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Routes
const routes: Routes = [{ path: '', redirectTo: 'books', pathMatch: 'full' }];

// Routing module
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
