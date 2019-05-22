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
        res.locals.books = books.map((book) => {
            // Map each book to the data required by the view
            return {
                id: book.id,
                title: book.title,
                author: book.author,
                genre: book.genre,
                year: book.year,
            };
        });

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
        // TODO: Validate form and create book
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
