import { BookInput } from '@/schemas/book.js';
import { Prisma } from '@prisma/client';

export default function createBook(data: BookInput) {
  return Prisma.validator<Prisma.BookCreateInput>()({
    title: data.title,
    author: data.author,
    genre: data.genre,
    year: data.year,
  });
}
