// Imports
import { ValidationError } from 'yup';

import BookCreateDto from '../../../dto/BookCreateDto';
import BookDto from '../../../dto/BookDto';
import withDatabaseConnection, { NextDatabaseApiHandler } from '../../../middleware/withDatabaseConnection';
import BookService from '../../../services/BookService';
import BookSchema from '../../../validation/BookSchema';

// Route handlers
const fetchListingHandler: NextDatabaseApiHandler<BookDto[]> = async (req, res) => {
    // Get book service
    const bookService = new BookService(req.db);

    // Get book listing
    const books = await bookService.getList();

    // Omit id and version from book data
    const bookDtos = books.map((book) => {
        const { version, ...bookDto } = book;

        return bookDto;
    });

    res.json(bookDtos);
};

const createBookHandler: NextDatabaseApiHandler = async (req, res) => {
    // Get book service
    const bookService = new BookService(req.db);

    try {
        // Attempt to validate request body using schema
        const bookData: BookCreateDto = await BookSchema.validate(req.body);

        // Create book using service
        const { version, ...bookDto } = await bookService.create(bookData);

        // Construct and set location header
        const location = `/api/books/${bookDto.id}`;
        res.setHeader('Location', location);

        // Set 201 status
        res.status(201);

        // Respond with book data
        res.json(bookDto);
    } catch (error) {
        /* istanbul ignore if */
        if (!(error instanceof ValidationError)) {
            throw error;
        }

        res.status(400).json(error);
    }
};

const handler = withDatabaseConnection(async (req, res) => {
    // Consider request method
    switch (req.method) {
        case 'GET':
            await fetchListingHandler(req, res);
            break;

        case 'POST':
            await createBookHandler(req, res);
            break;

        default: {
            const allowedMethods = ['GET', 'POST'].join(', ');
            res.setHeader('Allow', allowedMethods);
            res.status(405).end();
        }
    }
});

// Exports
export default handler;
