/**
 * Represents a book in the library.
 */
export class Book {
    /**
     * The unique ID of the book.
     */
    public readonly id!: number;

    /**
     * The title of the book.
     */
    public readonly title!: string;

    /**
     * The author of the book.
     */
    public readonly author: string;

    /**
     * The genre of the book.
     */
    public readonly genre?: string;

    /**
     * The year that the book was originally published.
     */
    public readonly year?: number;
}
