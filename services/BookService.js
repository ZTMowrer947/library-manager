// Imports
const Book = require("../models/Book");
const { Op } = require("sequelize");

// Service
class BookService {
    // Get list of books
    async getList(page = 1, search = "", propToSearchFor = "title") {
        // Set limit of records for each page
        const pageLimit = 10;
        
        // Book find options
        const bookFindOptions = {
            limit: pageLimit,
        };

        let bookCount;

        // Add search to options if a search was provided
        if (search) {
            // Add WHERE condition
            bookFindOptions.where = {
                // Set conditions for prop being searched for
                [propToSearchFor]: {
                    // Search term appears anywhere within book property
                    [Op.like]: `%${search.toLowerCase()}%`,
                },
            };

            // Count total number of books matching search term
            bookCount = await Book.count({ where: bookFindOptions.where });
        } else {
            // Otherwise, count total number of books in database
            bookCount = await Book.count();
        }

        // Calculate total number of pages
        const pageCount = Math.ceil(bookCount / pageLimit);

        // Calculate offset of records
        let pageOffset = (page - 1) * pageLimit;

        // Reset offset to 0 if page offset exceeds book count
        if (pageOffset > bookCount) pageOffset = 0;

        // Store offset in find options
        bookFindOptions.offset = pageOffset;

        // Return page of books and total number of pages
        return [await Book.findAll(bookFindOptions), pageCount];
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
        return book.destroy();
    }
}

// Export
module.exports = BookService;
