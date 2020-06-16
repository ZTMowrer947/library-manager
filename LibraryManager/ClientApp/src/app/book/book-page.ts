// Imports
import { Expose } from 'class-transformer';
import { Book } from './book';

/**
 * Represents a page of book data.
 */
export class BookPage {
    /**
     * The current page number.
     */
    @Expose({ name: 'pageNumber' })
    public readonly page: number;

    /**
     * The total number of pages of data available.
     */
    public readonly totalPages: number;

    /**
     * The number of items being displayed per page.
     */
    public readonly itemsPerPage: number;

    /**
     * The books from this page of data.
     */
    public readonly data: Book[];

    /**
     * The next page number if one if available, null otherwise.
     */
    public get nextPage(): number | null {
        // Calculate next page number
        const nextPage = this.page + 1;

        // Return next page number if valid
        return nextPage <= this.totalPages ? nextPage : null;
    }

    /**
     * The previous page number if one is available, null otherwise.
     */
    public get prevPage(): number | null {
        // Calculate previous page number
        const prevPage = this.page - 1;

        // Return previous page number if valid
        return prevPage >= 1 ? prevPage : null;
    }
}
