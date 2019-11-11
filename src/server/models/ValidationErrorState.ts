import BookDTO from "./BookDTO";

// Types
export interface SimpleValidationError {
    [property: string]: {
        value: string;
        errors: string[];
    };
}

// State
interface ValidationErrorState {
    requestData?: BookDTO;
    validationErrors?: SimpleValidationError;
}

// Export
export default ValidationErrorState;
