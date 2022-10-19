// Imports
const prisma = require('../lib/prisma');

// Service
class BookService {
    // Get list of books
    async getList(page = 1, search = "", propToSearchFor = "title", sortBy = "") {
        // Set limit of records for each page
        const pageLimit = 10;

        // Book find options
        const bookFindOptions = {
            take: pageLimit,
        };

        let bookCount;

        // Add search to options if a search was provided
        if (search) {
            // Add WHERE condition
            bookFindOptions.where = {
                // Set conditions for prop being searched for
                [propToSearchFor]: {
                    // Search term appears anywhere within book property
                    contains: search.toLowerCase(),
                },
            };

            // Count total number of books matching search term
            bookCount = await prisma.book.count({ where: bookFindOptions.where });
        } else {
            // Otherwise, count total number of books in database
            bookCount = await prisma.book.count();
        }

        // Add sorting order if provided
        if (sortBy) {
            // Trim "desc" from the end if present
            const sortProp = sortBy.substring(0, sortBy.indexOf("desc")) || sortBy;

            bookFindOptions.orderBy = [
                // Order in descending order if sort condition ends with "desc", ordering in ascending order otherwise
                { [sortProp]: sortBy.endsWith("desc") ? "DESC" : "ASC" },
            ];
        }

        // Calculate total number of pages
        const pageCount = Math.ceil(bookCount / pageLimit);

        // Calculate offset of records
        let pageOffset = (page - 1) * pageLimit;

        // Reset offset to 0 if page offset exceeds book count
        if (pageOffset > bookCount) pageOffset = 0;

        // Store offset in find options
        bookFindOptions.skip = pageOffset;

        // Return page of books and total number of pages
        return [await prisma.book.findMany(bookFindOptions), pageCount];
    }

    // Get single book by its ID
    async get(id) {
        return prisma.book.findUnique(id);
    }

    // Create a new book
    async create(newBookData) {
        return prisma.book.create({
            data: {
                title: newBookData.title,
                    author: newBookData.author,
                genre: newBookData.genre,
                year: parseInt(newBookData.year),
            }
        });
    }

    // Update a new book
    async update(book, updateBookData) {
        // Save changes to database
        return prisma.book.update({
            data: {
                title: updateBookData.title,
                author: updateBookData.author,
                genre: updateBookData.genre,
                year: updateBookData.year,
            },
            where: {
                id: book.id
            }
        })
    }

    async delete(book) {
        // Delete book
        return prisma.book.delete({ where: { id: book.id }});
    }
}

// Export
module.exports = BookService;
