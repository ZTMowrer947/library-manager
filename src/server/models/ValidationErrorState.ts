// Types
export interface SimpleValidationError {
    [property: string]: {
        value: string;
        errors: string[];
    };
}

// State
interface ValidationErrorState {
    validationErrors?: SimpleValidationError;
}

// Export
export default ValidationErrorState;
