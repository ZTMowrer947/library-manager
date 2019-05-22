// Imports
const { Router } = require("express");
const Book = require("../models/Book");

// Router setup
const router = Router();

// Middleware
// Handle ID param
router.param("id", (req, res, next, id) => {
    // Get book by id
    Book.findByPk(req.params.id)
    .then(book => {
        // If no book was found with this ID,
        if (!book) {
            // Set status to 404
            res.status(404);

            // Create error and pass to error handlers
            next(new Error(`Book not found with ID ${req.params.id}.`));
        }

        // Attach book to request
        req.book = book;

        // Pass control to next middleware or route
        next();
    });
});

// Routes
// /: Index route
router.get("/", (req, res) => {
    // Redirect to /books
    res.redirect("/books");
});

// /books: Book listing
router.get("/books", (req, res) => {
    // Get list of books
    Book.findAll().then((books) => {
        // Store book data in locals
        res.locals.books = books;

        // Render index template
        res.render("index");
    });
});

// /books/new: Create a new book
router.route("/books/new")
    .get((req, res) => {
        // Render new book form
        res.render("new-book");
    }).post((req, res) => {
        // TODO: Validate form

        // Create book
        const newBook = Book.build({
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            year: parseInt(req.body.year),
        });

        // Save to database
        newBook.save()
            // If successful,
            .then((book) => {
                // Attach book to locals form
                res.locals.book = book;

                // Redirect to book detail page
                res.redirect(`/books/${book.id}`);
            })
            // If an error occurs,
            .catch((errors) => {
                // Attach errors to view locals
                res.locals.errors = errors;

                // Rerender new book form
                res.render("new-book");
            });
    });

// /books/:id: Get/Update book details
router.route("/books/:id")
    .get((req, res, next) => {
        // Attach book to view locals
        res.locals.book = req.book;

        // Render update book form
        res.render("update-book");
    }).post((req, res) => {
        // TODO: Validate form

        // Update each book property if non-empty and updated
        if (req.body.title && req.body.title !== req.book.title)
            req.book.title = req.body.title;

        if (req.body.author && req.body.author !== req.book.author)
            req.book.author = req.body.author;

        if (req.body.genre && req.body.genre !== req.book.title)
            req.book.genre = req.body.genre;

        if (req.body.year && parseInt(req.body.year) !== req.book.title)
            req.book.year = parseInt(req.body.year);

        // Save to database
        req.book.save()
            // If successful,
            .then((book) => {
                // Attach book to locals form
                res.locals.book = book;

                // TODO: Display flash message indicating that update was successful

                // Redirect to book detail page
                res.redirect(`/books/${book.id}`);
            })
            // If an error occurs,
            .catch((errors) => {
                // Attach errors to view locals
                res.locals.errors = errors;

                // TODO: Display flash message indicating validation errors

                // Rerender new book form
                res.render("new-book");
            });
    });

// /books/:id/delete: Delete book with given ID
router.post("/books/:id/delete", (req, res) => {
    // TODO: Delete book

    // Redirect to book listing
    res.redirect("/books");
});

// Export
module.exports = router;
