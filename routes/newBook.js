// Imports
const { Router } = require("express");

// Router setup
const router = Router();

// Routes
router.route("/")
    .get((req, res) => {
        // Set page title for view
        res.locals.title = "Create Book";

        // Render new book form
        res.render("new-book");
    }).post(async (req, res) => {
        try {
            // TODO: Validate form

            // Create book
            const newBook = await req.bookService.create(req.body);

            // Attach book to locals form
            res.locals.book = newBook;

            // Redirect to book listing
            res.redirect("/books");

        } catch (error) {
            // Set status to 400 Bad Request
            res.status(400);

            // Attach errors to view locals
            res.locals.errors = error.errors;

            // Set page title for view
            res.locals.title = "Create Book";

            // Rerender new book form
            res.render("new-book");
        }
    });

// Export
module.exports = router;
