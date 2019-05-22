// Imports
const { Router } = require("express");

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
    // TODO: Get list of books

    // Render index template
    res.render("index");
});

// /books/new: Create a new book
router.route("/books/new")
    .get((req, res) => {
        // Render new book form
        res.redirect("new-book.pug");
    }).post((req, res) => {
        // TODO: Validate form and create book
    });

// /books/:id: Get/Update book details
router.route("/books/:id")
    .get((req, res) => {
        // Render update book form
        res.redirect("update-book.pug");
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
