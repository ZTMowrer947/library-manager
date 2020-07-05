// Imports
import Book from '../models/Book';

// Book data
const bookData: Book[] = [
    {
        id: 1,
        version: 1,
        title: 'A Brief History of Time',
        author: 'Stephen Hawking',
        genre: 'Non-Fiction',
        year: 1988,
    },
    {
        id: 2,
        version: 1,
        title: 'The Universe in a Nutshell',
        author: 'Stephen Hawking',
        genre: 'Non-Fiction',
        year: 2001,
    },
    {
        id: 3,
        version: 1,
        title: 'The Martian',
        author: 'Andy Weir',
        genre: 'Science Fiction',
        year: 2014,
    },
    {
        id: 4,
        version: 1,
        title: 'Ready Player One',
        author: 'Ernest Cline',
        genre: 'Science Fiction',
        year: 2011,
    },
    {
        id: 5,
        version: 1,
        title: 'Armada',
        author: 'Ernest Cline',
        genre: 'Science Fiction',
        year: 2015,
    },
    {
        id: 6,
        version: 1,
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        genre: 'Classic',
        year: 1813,
    },
    {
        id: 7,
        version: 1,
        title: 'Emma',
        author: 'Jane Austen',
        genre: 'Classic',
        year: 1815,
    },
    {
        id: 8,
        version: 1,
        title: "Harry Potter and the Philosopher's Stone",
        author: 'J.K. Rowling',
        genre: 'Fantasy',
        year: 1997,
    },
    {
        id: 9,
        version: 1,
        title: 'Harry Potter and the Chamber of Secrets',
        author: 'J.K. Rowling',
        genre: 'Fantasy',
        year: 1998,
    },
    {
        id: 10,
        version: 1,
        title: 'Harry Potter and the Prisoner of Azkaban',
        author: 'J.K. Rowling',
        genre: 'Fantasy',
        year: 1999,
    },
    {
        id: 11,
        version: 1,
        title: 'Harry Potter and the Goblet of Fire',
        author: 'J.K. Rowling',
        genre: 'Fantasy',
        year: 2000,
    },
    {
        id: 12,
        version: 1,
        title: 'Harry Potter and the Order of the Phoenix',
        author: 'J.K. Rowling',
        genre: 'Fantasy',
        year: 2003,
    },
    {
        id: 13,
        version: 1,
        title: 'Harry Potter and the Half-Blood Prince',
        author: 'J.K. Rowling',
        genre: 'Fantasy',
        year: 2005,
    },
    {
        id: 14,
        version: 1,
        title: 'Harry Potter and the Deathly Hallows',
        author: 'J.K. Rowling',
        genre: 'Fantasy',
        year: 2007,
    },
];

// Service
class BookService {
    private readonly _books = bookData;

    public async getList(): Promise<Book[]> {
        return Promise.resolve(this._books);
    }

    public async get(id: number): Promise<Book | null> {
        return Promise.resolve(this._books)
            .then((books) => books.find((book) => book.id === id))
            .then((book) => book ?? null);
    }
}

// Exports
export default BookService;
