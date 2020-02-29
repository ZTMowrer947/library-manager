import BookDTO from "./BookDTO";

// Types
export interface SimpleValidationError {
    [property: string]: string[];
}

// State
interface ValidationErrorState {
    requestData?: BookDTO;
    validationErrors?: SimpleValidationError;
}

// Export
export default ValidationErrorState;
