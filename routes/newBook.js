// Imports
const { Router } = require("express");

// Router setup
const router = Router();

// Routes
router.route("/")
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

// Export
module.exports = router;
