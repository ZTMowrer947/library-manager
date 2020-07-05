// Imports
import EntityBase from './EntityBase';

// Entity type
interface Book extends EntityBase {
    title: string;
    author: string;
    genre: string | null;
    year: number | null;
}

// Exports
export default Book;
