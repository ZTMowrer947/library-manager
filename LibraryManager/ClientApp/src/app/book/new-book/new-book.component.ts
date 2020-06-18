import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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
        console.log(this.newBookForm.value);
    }
}
