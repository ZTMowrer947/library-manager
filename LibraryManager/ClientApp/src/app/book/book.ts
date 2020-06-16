/**
 * Represents a book in the library.
 */
export class Book {
    /**
     * The title of the book.
     */
    public readonly title: string;

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

    public constructor(
        title: string,
        author: string,
        genre?: string,
        year?: number
    ) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.year = year;
    }
}
