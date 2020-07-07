// Imports
import withDatabaseConnection from '../../../middleware/withDatabaseConnection';
import BookService from '../../../services/BookService';

// Route handler
const handler = withDatabaseConnection(async (req, res) => {
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
});

// Exports
export default handler;
