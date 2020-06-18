import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BookCreateViewmodel } from '../book-create-viewmodel';

@Component({
    selector: 'app-new-book',
    templateUrl: './new-book.component.html',
    styleUrls: ['./new-book.component.scss'],
})
export class NewBookComponent implements OnInit {
    public newBookForm: FormGroup;

    public constructor(private fb: FormBuilder) {
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
            genre: formData.author.trim() || undefined,
            year: normalizedYear,
        };

        console.log(viewModel);
    }
}
