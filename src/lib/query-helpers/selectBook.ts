import { Prisma } from '@prisma/client';

export default function selectBook() {
  return Prisma.validator<Prisma.BookSelect>()({
    id: true,
    title: true,
    author: true,
    genre: true,
    year: true,
  });
}
