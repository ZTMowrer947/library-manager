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
        // TODO: Implement create functionality
        throw new Error("Not implemented yet");
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
