// Imports
import { object, string, number } from 'yup';

// Validation Schema
const BookSchema = object()
    .shape({
        title: string().required(),
        author: string().required(),
        genre: string().defined(),
        year: number().positive().integer().defined(),
    })
    .required();

// Exports
export default BookSchema;
