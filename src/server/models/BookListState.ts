// Imports
import Book from "../database/entities/Book.entity";
import BaseState from "./BaseState";

// State
interface BookListState extends BaseState {
    books: Book[];
}

// Export
export default BookListState;
