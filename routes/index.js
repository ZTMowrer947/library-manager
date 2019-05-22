// Imports
const { Router } = require("express");
const asyncHandler = require("express-async-handler");  // Handles Promise rejections by passing them to express error handlers
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
router.use("/books/new", require("./newBook"));

// Handle ID param
router.param("id", async (req, res, next, id) => {
    try {
        // Get book by id
        const book = await req.bookService.get(id)

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

// /books/:id: Get/Update book details
router.use("/books/:id", require("./bookDetail"));

// Export
module.exports = router;
