// Imports
import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import Book from "../database/entities/Book.entity";
import BookDTO from "../models/BookDTO";

// Service
@Service()
export default class BookService {
    private repository!: Repository<Book>;

    public constructor(@InjectRepository(Book) repository: Repository<Book>) {
        this.repository = repository;
    }

    public async getList(): Promise<Book[]> {
        return this.repository.find();
    }

    public async getById(id: string): Promise<Book | undefined> {
        return this.repository.findOne(id);
    }

    public async create(bookData: BookDTO): Promise<string> {
        // Create Book instance
        const book = new Book();

        // Fill out data
        book.title = bookData.title;
        book.author = bookData.author;
        book.genre = bookData.genre ?? null;
        book.year = bookData.year ?? null;

        // Save book to database
        await this.repository.save(book);

        // Return id of new book
        return book.id;
    }

    public async update(book: Book, bookData: BookDTO): Promise<void> {
        // TODO: Implement update functionality
        throw new Error("Not implemented yet");
    }

    public async delete(book: Book): Promise<void> {
        // TODO: Implement delete functionality
        throw new Error("Not implemented yet");
    }
}
