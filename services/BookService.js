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
            year: parseInt(newBookData.year),
        });
    }

    // Update a new book
    async update(book, updateBookData) {
        // Update each book property if non-empty and different
        if (updateBookData.title && updateBookData.title !== book.title)
            book.title = updateBookData.title;

        if (updateBookData.author && updateBookData.author !== book.author)
            book.author = updateBookData.author;

        if (updateBookData.genre && updateBookData.genre !== book.title)
            book.genre = updateBookData.genre;

        if (updateBookData.year && parseInt(updateBookData.year) !== book.title)
            book.year = parseInt(updateBookData.year);

        // Save changes to database
        return book.save();
    }

    async delete(book) {
        // Delete book
        return book;
    }
}

// Export
module.exports = BookService;
