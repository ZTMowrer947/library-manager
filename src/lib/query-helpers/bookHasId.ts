import { Prisma } from '@prisma/client';

export default function bookHasId(id: number) {
  return Prisma.validator<Prisma.BookWhereUniqueInput>()({
    id,
  });
}
