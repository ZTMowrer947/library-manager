// Imports
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, PartialObserver } from 'rxjs';

import { BookListingComponent } from './book-listing.component';
import { BookService } from '../book.service';
import { BookPage } from '../book-page';
import { BookStubService } from '../../../testing/book-stub.service';

// Test Suite
describe('BookListingComponent', () => {
    let getPageSpy: jest.SpyInstance<Observable<BookPage>, [number]>;
    let component: BookListingComponent;
    let fixture: ComponentFixture<BookListingComponent>;

    beforeEach(async () => {
        // Configure testing module
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([
                    {
                        path: 'books',
                        component: BookListingComponent,
                        pathMatch: 'full',
                    },
                ]),
            ],
            declarations: [BookListingComponent],
            providers: [{ provide: BookService, useClass: BookStubService }],
        }).compileComponents();

        // Get book service and set up spies
        const bookService: BookService = TestBed.get(BookService);
        getPageSpy = jest.spyOn(bookService, 'getPage');

        // Create fixture and get component instance
        fixture = TestBed.createComponent(BookListingComponent);
        component = fixture.componentInstance;

        // Perform first-time data bindings
        fixture.detectChanges();
    });

    it('should properly initialize book data on init', (done) => {
        // Expect getPage on book service to have been called
        expect(getPageSpy).toHaveBeenCalledWith(1);

        // Get returned page stream
        const expected$: Observable<BookPage> =
            getPageSpy.mock.results[0].value;

        // Create observer
        const observer: PartialObserver<BookPage> = {
            next(expected) {
                // Expect component to have been initalized with page from service
                expect(expected).toStrictEqual(component.bookPage);

                // Finish test
                done();
            },
            error(err) {
                // Fail test with given error
                fail(err);
            },
        };

        // Subscribe to expected page stream
        expected$.subscribe(observer);
    });

    it('should display the details of the book data in a table', () => {
        // Get HTML element for component
        const compiled: HTMLElement = fixture.nativeElement;

        // Get table element, expecting it to exist
        const table = compiled.querySelector('table');
        expect(table).toBeDefined();

        // Get tbody element, expecting it to exist
        const tbody = table.querySelector('tbody');
        expect(tbody).toBeDefined();

        // Get all table rows in tbody
        const tableRows = tbody.querySelectorAll('tr');

        // Expect there to be a row for each book
        expect(tableRows).toHaveLength(component.bookPage.data.length);

        // For each row,
        tableRows.forEach((row, index) => {
            // Get corresponding book data
            const book = component.bookPage.data[index];

            // Get all the cells in this row
            const cells = row.querySelectorAll('td');

            // Expect there to be 4 cells
            expect(cells).toHaveLength(4);

            // Extract each cell
            const titleCell = cells.item(0);
            const authorCell = cells.item(1);
            const genreCell = cells.item(2);
            const yearCell = cells.item(3);

            // Expect each cell's text content to match corresponding book property
            expect(titleCell.textContent.trim()).toBe(book.title);
            expect(authorCell.textContent.trim()).toBe(book.author);
            expect(genreCell.textContent.trim()).toBe(book.genre);
            expect(yearCell.textContent.trim()).toBe(
                book.year ? book.year.toString() : undefined
            );
        });
    });
});
