// Imports
const { Router } = require("express");
const asyncHandler = require("express-async-handler");

// Router setup
const router = Router();

// Routes
router.route("/")
    .get((req, res) => {
        // Attach book to view locals
        res.locals.book = req.book;

        // Set page title for view
        res.locals.title = "Book Details";

        // Render update book form
        res.render("update-book");
    }).post(async (req, res) => {
        try {
            // Create book
            const updatedBook = await req.bookService.update(req.book, req.body);

            // Attach book to locals form
            res.locals.book = updatedBook;

            // Redirect to book listing
            res.redirect("/books");
        } catch (error) {
            // Set status to 400 Bad Request
            res.status(400);

            // Attach errors to view locals
            res.locals.errors = error.errors;

            // Set page title for view
            res.locals.title = "Book Details";

            // Attach book to locals form
            res.locals.book = req.book;

            // Rerender update book form
            res.render("update-book");
        }
    });

// /books/:id/delete: Delete book with given ID
router.use("/delete", require("./deleteBook"));

// Export
module.exports = router;
