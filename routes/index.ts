import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import BookService from "../services/BookService";
import bookDetail from "./bookDetail";
import newBook from './newBook';

const router = Router();

// Attach book service to each request
router.use((req, res, next) => {
    (req as any).bookService = new BookService();

    next();
});

// Routes
router.get("/", (req, res) => {
    res.redirect("/books");
});

// /books: Book listing
router.get("/books", asyncHandler(async (req, res) => {
    // Get parameters from query string
    let page = parseInt(req.query.page?.toString() ?? '');
    let searchTerm = req.query.search?.toString();
    let propToSearchFor = req.query["search-for"]?.toString() ?? "title";
    let propToSortBy = req.query["sort-by"]?.toString() ?? "";

    // Define array of valid props to search for and sort by
    const validPropsToSearchFor = ["title", "author", "genre", "year"];
    const validSortProps = ["", ...validPropsToSearchFor, ...validPropsToSearchFor.map(prop => prop += "desc")]; // Include valid search for props and their descending-order counterparts

    // If page number is NaN (not a number) or is less than 1, reset to 1
    if (isNaN(page) || page < 1) page = 1;

    if (!validPropsToSearchFor.includes(propToSearchFor)) propToSearchFor = "title";

    if (!validSortProps.includes(propToSortBy)) {
        propToSortBy = "";
    }

    // Get list of books and total number of pages
    const [books, pageCount] = await (req as any).bookService.getList(page, searchTerm, propToSearchFor, propToSortBy);

    // Store book data in locals
    res.locals.books = books;

    // Set title to "Search Results" if searching, "Book Listing" otherwise
    res.locals.title = searchTerm ? "Search Results" : "Book Listing";

    // Generate range of page numbers (1 to number of pages)
    res.locals.pages = [...Array(pageCount).keys()].map(num => num + 1);

    // Set selected page number (page 1 if page number was greater than page count, page number otherwise)
    res.locals.selectedPage = page > pageCount ? 1 : page;

    // Store search term and sort prop in view locals
    res.locals.searchTerm = searchTerm;
    res.locals.searchProp = propToSearchFor;
    res.locals.sortProp = propToSortBy;

    // Render index template
    res.render("index");
}));

// /books/new: Create a new book
router.use("/books/new", newBook);

// Handle ID param
router.param("id", async (req, res, next, id) => {
    try {
        // Get book by id
        const book = await (req as any).bookService.get(Number.parseInt(id))

        // If no book was found with this ID,
        if (!book) {
            // Set status to 404
            res.status(404);

            // Create error and throw it
            throw new Error(`Book not found with ID ${id}.`);
        }

        // Attach book to request
        (req as any).book = book;

        // Pass control to next middleware or route
        next();
    } catch (error) {
        // Pass error to error handlers
        next(error);
    }
});

// /books/:id: Get/Update book details
router.use("/books/:id", bookDetail);

// All other routes are a 404
router.all("*", (req, res, next) => {
    // Set status to 404 Not Found
    res.status(404);

    // Create error and pass to error handlers
    next(new Error(`Route ${req.path} does not exist.`));
});

export default router;
