// Imports
import Book from '@/models/Book';

// DTO
type BookDto = Omit<Book, 'version'>;

// Exports
export default BookDto;
