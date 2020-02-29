// Imports
import Book from "../database/entities/Book.entity";
import BaseState from "./BaseState";

// State
interface BookState extends BaseState {
    book: Book;
}

// Export
export default BookState;
