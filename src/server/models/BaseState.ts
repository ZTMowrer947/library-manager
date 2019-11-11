// Imports
import BookService from "../services/Book.service";

// State
interface BaseState {
    scripts: string[];
    styles: string[];
    scriptHashes: string[];
    styleHashes: string[];
    bookService: BookService;
}

// Export
export default BaseState;
