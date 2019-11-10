// Imports
import base32 from "hi-base32";
import { getRepository } from "typeorm";
import BookService from "../Book.service";
import Book from "../../database/entities/Book.entity";

// Test Suite
describe("BookService", () => {
    let bookService: BookService;
    let nilId: string;

    // Run before each test
    beforeAll(() => {
        // Get book repository
        const repository = getRepository(Book);

        // Initialize book service
        bookService = new BookService(repository);

        // Set nil id
        const nilBytes = Buffer.alloc(15);
        nilId = base32.encode(nilBytes);
    });

    describe(".getList", () => {
        it("should retrieve a list of books", async () => {
            // Expect book listing to have length 15
            await expect(bookService.getList()).resolves.toHaveLength(15);
        });
    });

    describe(".create", () => {
        it.todo("should create a new book");
    });

    describe(".getById", () => {
        it.todo("should retrieve a single book by its id");

        it("should resolve to undefined if no book exists with the given id", async () => {
            // Expect book retrieval to result in undefined with nil id
            await expect(bookService.getById(nilId)).resolves.toBeUndefined();
        });
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
