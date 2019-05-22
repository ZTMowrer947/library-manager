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
