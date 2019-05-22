// Imports
const { Router } = require("express");
const asyncHandler = require("express-async-handler");
const Book = require("../models/Book");
const BookService = require("../services/BookService");

// Router setup
const router = Router();

// Middleware
// Add book service to request
router.use((req, res, next) => {
    // Instantiate new book service and attach to request object
    req.bookService = new BookService();

    // Pass control to next middleware or route
    next();
});

// Handle ID param
router.param("id", async (req, res, next, id) => {
    try {
        // Get book by id
        const book = await Book.findByPk(id)

        // If no book was found with this ID,
        if (!book) {
            // Set status to 404
            res.status(404);

            // Create error and throw it
            throw new Error(`Book not found with ID ${id}.`);
        }

        // Attach book to request
        req.book = book;

        // Pass control to next middleware or route
        next();
    } catch (error) {
        // Pass error to error handlers
        next(error);
    }
});

// Routes
// /: Index route
router.get("/", (req, res) => {
    // Redirect to /books
    res.redirect("/books");
});

// /books: Book listing
router.get("/books", asyncHandler(async (req, res) => {
    // Get list of books
    const books = await req.bookService.getList();

    // Store book data in locals
    res.locals.books = books;

    // Render index template
    res.render("index");
}));

// /books/new: Create a new book
router.route("/books/new")
    .get((req, res) => {
        // Render new book form
        res.render("new-book");
    }).post(async (req, res) => {
        try {
            // TODO: Validate form

            // Create book
            const newBook = await req.bookService.create(req.body);

            // Attach book to locals form
            res.locals.book = newBook;

            // Redirect to book detail page
            res.redirect(`/books/${newBook.id}`);

        } catch (error) {
            // Set status to 400 Bad Request
            res.status(400);

            // Attach errors to view locals
            res.locals.errors = error.errors;

            // Rerender new book form
            res.render("new-book");
        }
    });

// /books/:id: Get/Update book details
router.route("/books/:id")
    .get((req, res) => {
        // Attach book to view locals
        res.locals.book = req.book;

        // Render update book form
        res.render("update-book");
    }).post(async (req, res) => {
        try {
            // TODO: Validate form

            // Create book
            const updatedBook = await req.bookService.update(req.book, req.body);

            // Attach book to locals form
            res.locals.book = updatedBook;

            // Redirect to book detail page
            res.redirect(`/books/${updatedBook.id}`);
        } catch (errors) {
            // Set status to 400 Bad Request
            res.status(400);

            // Attach errors to view locals
            res.locals.errors = errors;

            // Rerender new book form
            res.render("new-book");
        }
    });

// /books/:id/delete: Delete book with given ID
router.route("/books/:id/delete")
    .get((req, res) => {
        // Attach book to view locals
        res.locals.book = req.book;

        // Render delete confirmation view
        res.render("delete-confirm");
    }).post(asyncHandler(async (req, res) => {
        // Ensure that title from form data matches book title
        const titlesMatch = req.book.title === req.body.title;

        // If the titles match,
        if (titlesMatch) {
            // Delete book
            await req.bookService.delete(req.book);

            // Redirect to book listing
            res.redirect("/books");
        } else {
            // Otherwise, set status to 400 Bad Request
            res.status(400);

            // Attach error to view locals
            res.locals.error = new Error("Request body title does not match book title.");

            // Attach book to view locals
            res.locals.book = req.book;

            // Re-render delete confirmation view
            res.render("delete-confirm");
        }
    }));

// Export
module.exports = router;
