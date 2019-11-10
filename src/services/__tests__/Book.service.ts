// Imports
import BookService from "../Book.service";

// Test Suite
describe("BookService", () => {
    describe(".getList", () => {
        it.todo("should retrieve a list of books");
    });

    describe(".create", () => {
        it.todo("should create a new book");
    });

    describe(".getById", () => {
        it.todo("should retrieve a single book by its id");

        it.todo(
            "should resolve to undefined if no book exists with the given id"
        );
    });

    describe(".update", () => {
        it.todo("should update an existing book");

        it.todo("should have correctly applied the updates");
    });

    describe(".delete", () => {
        it.todo("should delete an existing book");

        it.todo("should have deleted the book from the database");
    });
});
