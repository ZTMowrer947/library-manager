/* eslint-disable @typescript-eslint/no-non-null-assertion */
// Imports
import base32 from "hi-base32";
import { getRepository } from "typeorm";
import BookService from "../Book.service";
import Book from "../../database/entities/Book.entity";
import BookDTO from "../../models/BookDTO";

// Test Suite
describe("BookService", () => {
    let bookService: BookService;
    let bookData: BookDTO;
    let id: string;
    let nilId: string;

    // Run before each test
    beforeAll(() => {
        // Get book repository
        const repository = getRepository(Book);

        // Initialize book service
        bookService = new BookService(repository);

        // Define book data for new book
        bookData = new BookDTO();
        bookData.title = "How to write tests using Jest";
        bookData.author = "The Jester";
        bookData.genre = "Informative";
        bookData.year = 2019;

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
        it("should create a new book", async () => {
            // Create new book and store id
            id = await bookService.create(bookData);

            // Expect id not to be empty
            expect(id).toBeTruthy();
        });
    });

    describe(".getById", () => {
        it("should retrieve a single book by its id", async () => {
            // Get book by id
            const book = await bookService.getById(id);

            // Expect book to be defined
            expect(book).toBeDefined();

            // Expect book properties to match input data
            expect(book?.id).toBe(id);
            expect(book?.title).toBe(bookData.title);
            expect(book?.author).toBe(bookData.author);
            expect(book?.genre).toBe(bookData.genre);
            expect(book?.year).toBe(bookData.year);
        });

        it("should resolve to undefined if no book exists with the given id", async () => {
            // Expect book retrieval to result in undefined with nil id
            await expect(bookService.getById(nilId)).resolves.toBeUndefined();
        });
    });

    describe(".update", () => {
        let updateData: BookDTO;

        beforeAll(() => {
            // Define update data
            updateData = new BookDTO();
            updateData.title = "How to write tests using Jest, 2nd edition";
            updateData.author = "The Great Jester";
            updateData.genre = "Instructional";
            updateData.year = 2022;
        });

        it("should update an existing book", async () => {
            // Get book by id
            const book = await bookService.getById(id);

            // Expect book to be defined
            expect(book).toBeDefined();

            // Update book and expect no errors
            await expect(
                bookService.update(book!, updateData)
            ).resolves.not.toThrow();
        });

        it("should have correctly applied the updates", async () => {
            // Get book by id
            const book = await bookService.getById(id);

            // Expect book to be defined
            expect(book).toBeDefined();

            // Expect book properties to match updated data
            expect(book?.id).toBe(id);
            expect(book?.title).not.toBe(bookData.title);
            expect(book?.author).not.toBe(bookData.author);
            expect(book?.genre).not.toBe(bookData.genre);
            expect(book?.year).not.toBe(bookData.year);
            expect(book?.title).toBe(updateData.title);
            expect(book?.author).toBe(updateData.author);
            expect(book?.genre).toBe(updateData.genre);
            expect(book?.year).toBe(updateData.year);

            // Expect update timestamp to differ from creation timestamp
            expect(book?.updatedAt.getTime()).not.toBe(
                book?.createdAt.getTime()
            );
        });
    });

    describe(".delete", () => {
        it("should delete an existing book", async () => {
            // Get book by id
            const book = await bookService.getById(id);

            // Expect book to be defined
            expect(book).toBeDefined();

            // Delete book and expect no errors
            await expect(bookService.delete(book!)).resolves.not.toThrow();
        });

        it("should have deleted the book from the database", async () => {
            // Expect book retrieval to result in undefined
            await expect(bookService.getById(id)).resolves.toBeUndefined();
        });
    });
});
