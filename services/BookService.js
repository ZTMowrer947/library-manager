// Imports
const Book = require("../models/Book");

// Service
class BookService {
    // Get list of books
    async getList() {
        return Book.findAll();
    }

    // Get single book by its ID
    async get(id) {
        return Book.findByPk(id);
    }

    // Create a new book
    async create(newBookData) {
        return Book.create({
            title: newBookData.title,
            author: newBookData.author,
            genre: newBookData.genre,
            year: parseInt(newBookDate.year),
        });
    }

    // Update a new book
    async update(id, updateBookData) {
        const book = await this.get(id);

        // Update each book property if non-empty and different
        if (req.body.title && req.body.title !== book.title)
            book.title = req.body.title;

        if (req.body.author && req.body.author !== book.author)
            book.author = req.body.author;

        if (req.body.genre && req.body.genre !== book.title)
            book.genre = req.body.genre;

        if (req.body.year && parseInt(req.body.year) !== book.title)
            book.year = parseInt(req.body.year);

        // Save changes to database
        return book.save();
    }

    async delete(id) {
        // Get book by ID
        const book = await this.get(id);

        // Delete book
        return book;
    }
}

// Export
module.exports = BookService;
