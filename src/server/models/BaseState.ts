// Imports
import BookService from "../services/Book.service";

// State
interface BaseState {
    scripts: string[];
    styles: string[];
    scriptHashes: string[];
    styleHashes: string[];
    bookService: BookService;
    csrfToken: string;
}

// Export
export default BaseState;
