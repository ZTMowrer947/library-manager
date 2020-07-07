// Imports
import { EntitySchema } from 'typeorm';

import Book from '@/models/Book';

// Entity Schema
const BookEntity: EntitySchema<Book> = new EntitySchema({
    name: 'Book',
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true,
        },
        version: {
            type: 'int',
            version: true,
        },
        title: {
            type: 'varchar',
            nullable: false,
        },
        author: {
            type: 'varchar',
            nullable: false,
        },
        genre: {
            type: 'varchar',
            nullable: true,
        },
        year: {
            type: 'int',
            nullable: true,
        },
    },
});

// Exports
export default BookEntity;
