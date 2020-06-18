import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { BookCreateViewmodel } from '../book-create-viewmodel';
import { BookService } from '../book.service';
import { ApiValidationError } from '../../error/api-validation-error';

@Component({
    selector: 'app-new-book',
    templateUrl: './new-book.component.html',
    styleUrls: ['./new-book.component.scss'],
})
export class NewBookComponent implements OnInit {
    public newBookForm: FormGroup;

    public constructor(
        private router: Router,
        private fb: FormBuilder,
        private bookService: BookService
    ) {
        this.newBookForm = this.fb.group({
            title: [''],
            author: [''],
            genre: [''],
            year: [''],
        });
    }

    public ngOnInit() {}

    public onSubmit() {
        // Get form values
        const formData = this.newBookForm.value;

        // Normalize year
        const formYear: number | null = formData.year;
        const normalizedYear: number | undefined = formYear
            ? Math.trunc(formYear)
            : undefined;

        // Generate book creation view model from form data
        const viewModel: BookCreateViewmodel = {
            title: formData.title.trim(),
            author: formData.author.trim(),
            genre: formData.genre.trim() || undefined,
            year: normalizedYear,
        };

        this.bookService.create(viewModel).subscribe({
            complete: () => {
                // When complete, redirect to home page
                this.router.navigate(['books']);
            },
            error: (err) => {
                // If an error occurred,

                // If it is a validation error,
                if (err instanceof ApiValidationError) {
                    // For each invalid field,
                    Object.keys(err.errors).forEach((key) => {
                        // Get error for field
                        const error = err.errors[key];

                        // Set error on field
                        this.newBookForm.get(key).setErrors({
                            serverError: error,
                        });
                    });
                }
            },
        });
    }

    public get title() {
        return this.newBookForm.get('title');
    }
    public get author() {
        return this.newBookForm.get('author');
    }
    public get genre() {
        return this.newBookForm.get('genre');
    }
    public get year() {
        return this.newBookForm.get('year');
    }
}
