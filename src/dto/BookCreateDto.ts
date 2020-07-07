// Imports
import BookDto from './BookDto';

// DTO
type BookCreateDto = Omit<BookDto, 'id'>;

// Exports
export default BookCreateDto;
