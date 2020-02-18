// Imports
import { TestBed } from '@angular/core/testing';

import { BookService } from './book.service';

// Test Suite
describe('BookService', () => {
    let service: BookService;

    // Setup
    beforeEach(() => {
        // Configure testing module
        TestBed.configureTestingModule({});

        // Inject service under test
        service = TestBed.inject(BookService);
    });

    // Tests
    it('should be created successfully', () => {
        // Expect service to have been successfully injected
        expect(service).toBeTruthy();
    });
});
