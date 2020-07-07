// Imports
import withDatabaseConnection from '@/middleware/withDatabaseConnection';
import BookService from '@/services/BookService';

// Route handler
const handler = withDatabaseConnection(async (req, res) => {
    // Get book service
    const bookService = new BookService(req.db);

    // Extract ID from params
    const id = Number.parseInt(req.query.id.toString(), 10);

    // If the ID is not a number,
    if (Number.isNaN(id)) {
        // Respond with 422 error
        res.status(422);
        res.json({
            message: 'ID param must be numeric',
        });
        return;
    }

    // Fetch book with ID
    const book = await bookService.get(id);

    // If book was not found,
    if (!book) {
        // Respond with 404 error
        res.status(404);
        res.json({
            message: `No book exists with ID "${id}"`,
        });
        return;
    }

    // Otherwise, separate version from book
    const { version, ...bookDto } = book;

    // Respond with book data
    res.json(bookDto);
});

// Exports
export default handler;
