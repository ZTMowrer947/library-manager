// Imports
import { plainToClass } from "class-transformer";
import { Connection } from "typeorm";
import Book from "./entities/Book.entity";

// Seed script
const seed = async (connection: Connection): Promise<void> => {
    // Define entities to check for existing data
    const entities = [Book];

    // Declare variable to store whether seeding is needed.
    let shouldSeed = true;

    // Count each type of entity in the database
    for (const Entity of entities) {
        // Count number of rows present in entity table
        const count = await connection.manager.count(Entity);

        // If count is greater than zero,
        if (count > 0) {
            // Set should seed flag to false
            shouldSeed = false;

            // Exit loop
            break;
        }

        // If we should seed,
        if (shouldSeed) {
            // Define list of books to create
            const books = [
                {
                    title: "Harry Potter and the Philosopher's Stone",
                    author: "J.K. Rowling",
                    genre: "Fantasy",
                    year: "1997",
                },
                {
                    title: "Harry Potter and the Chamber of Secrets",
                    author: "J.K. Rowling",
                    genre: "Fantasy",
                    year: "1998",
                },
                {
                    title: "Harry Potter and the Prisoner of Azkaban",
                    author: "J.K. Rowling",
                    genre: "Fantasy",
                    year: "1999",
                },
                {
                    title: "Harry Potter and the Goblet of Fire",
                    author: "J.K. Rowling",
                    genre: "Fantasy",
                    year: "2000",
                },
                {
                    title: "Harry Potter and the Order of the Phoenix",
                    author: "J.K. Rowling",
                    genre: "Fantasy",
                    year: "2003",
                },
                {
                    title: "Harry Potter and the Half-Blood Prince",
                    author: "J.K. Rowling",
                    genre: "Fantasy",
                    year: "2005",
                },
                {
                    title: "Harry Potter and the Deathly Hallows",
                    author: "J.K. Rowling",
                    genre: "Fantasy",
                    year: "2007",
                },
                {
                    title: "A Brief History of Time",
                    author: "Stephen Hawking",
                    genre: "Non Fiction",
                    year: "1988",
                },
                {
                    title: "The Universe in a Nutshell",
                    author: "Stephen Hawking",
                    genre: "Non Fiction",
                    year: "2001",
                },
                {
                    title: "Frankenstein",
                    author: "Mary Shelley",
                    genre: "Horror",
                    year: "1818",
                },
                {
                    title: "The Martian",
                    author: "Andy Weir",
                    genre: "Science Fiction",
                    year: "2014",
                },
                {
                    title: "Ready Player One",
                    author: "Ernest Cline",
                    genre: "Science Fiction",
                    year: "2011",
                },
                {
                    title: "Armada",
                    author: "Ernest Cline",
                    genre: "Science Fiction",
                    year: "2015",
                },
                {
                    title: "Pride and Prejudice",
                    author: "Jane Austen",
                    genre: "Classic",
                    year: "1813",
                },
                {
                    title: "Emma",
                    author: "Jane Austen",
                    genre: "Classic",
                    year: "1815",
                },
            ];

            // Convert book objects into Book entity instances
            const bookEntities = plainToClass(Book, books);

            // Save books to database
            await connection.manager.save(bookEntities);
        }
    }
};

// Export
export default seed;
