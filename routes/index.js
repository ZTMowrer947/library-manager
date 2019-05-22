// Imports
const { Router } = require("express");
const Book = require("../models/Book");

// Router setup
const router = Router();

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
            year: Number(req.body.year),
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
    .get((req, res) => {
        // Render update book form
        res.render("update-book");
    }).post((req, res) => {
        // TODO: Validate form and update book
    });

// /books/:id/delete: Delete book with given ID
router.post("/books/:id/delete", (req, res) => {
    // TODO: Delete book

    // Redirect to book listing
    res.redirect("/books");
});

// Export
module.exports = router;
