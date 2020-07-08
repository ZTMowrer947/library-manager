// Imports
import { Connection, Repository } from 'typeorm';

import BookEntity from '../entities/BookEntity';
import Book from '../models/Book';
import BookCreateDto from '../dto/BookCreateDto';

// Service
class BookService {
    private readonly repository: Repository<Book>;

    public constructor(connection: Connection) {
        this.repository = connection.getRepository<Book>(BookEntity);
    }

    public async getList(): Promise<Book[]> {
        return this.repository.find();
    }

    public async get(id: number): Promise<Book | null> {
        const book = await this.repository.findOne(id);

        return book ?? null;
    }

    public async create(bookData: BookCreateDto): Promise<Book> {
        // Create book
        const book = await this.repository.save(bookData);

        // Return newly created book data
        return book;
    }

    public async update(book: Book, bookData: BookCreateDto): Promise<void> {
        // Create updated copy of book data
        const updatedBook: Book = {
            ...book,
            title: bookData.title,
            author: bookData.author,
            genre: bookData.genre,
            year: bookData.year,
        };

        // Save updated book
        await this.repository.save(updatedBook);
    }

    public async delete(book: Book): Promise<void> {
        // Delete book
        await this.repository.remove(book);
    }
}

// Exports
export default BookService;
