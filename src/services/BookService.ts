// Imports
import { Connection, Repository } from 'typeorm';

import BookEntity from '../entities/BookEntity';
import Book from '../models/Book';

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
}

// Exports
export default BookService;
