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
router.use("/delete", require("./deleteBook"));

// Export
module.exports = router;
