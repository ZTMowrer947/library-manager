import { Book } from "@prisma/client";
import prisma from '../lib/prisma';

// Service
class BookService {
    // Get list of books
    async getList(page = 1, search = "", propToSearchFor = "title", sortBy = "") {
        const pageLimit = 10;

        const bookFindOptions: any = {
            take: pageLimit,
        };

        let bookCount;

        // Add search to options if a search was provided
        if (search) {
            // Add WHERE condition
            bookFindOptions.where = {
                [propToSearchFor]: {
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
                { [sortProp]: sortBy.endsWith("desc") ? "desc" : "asc" },
            ];
        }

        const pageCount = Math.ceil(bookCount / pageLimit);
        let pageOffset = (page - 1) * pageLimit;

        // Reset offset to 0 if page offset exceeds book count
        if (pageOffset > bookCount) pageOffset = 0;

        bookFindOptions.skip = pageOffset;

        // Return page of books and total number of pages
        return [await prisma.book.findMany(bookFindOptions), pageCount];
    }

    // Get single book by its ID
    async get(id: Book['id']) {
        return prisma.book.findUnique({ where: { id } });
    }

    // Create a new book
    async create(newBookData: any) {
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
    async update(book: Book, updateBookData: any) {
        return prisma.book.update({
            data: {
                title: updateBookData.title,
                author: updateBookData.author,
                genre: updateBookData.genre,
                year: parseInt(updateBookData.year),
            },
            where: {
                id: book.id
            }
        })
    }

    // Delete the provided book
    async delete(book: Book) {
        return prisma.book.delete({ where: { id: book.id }});
    }
}

// Export
export default BookService;
