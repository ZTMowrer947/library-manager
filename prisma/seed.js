/* eslint-env node */
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { PrismaClient } from '@prisma/client';
import Papa from 'papaparse';

const csvPath = join(process.cwd(), 'prisma', '/Books.csv');

const prisma = new PrismaClient();

// Map each CSV row to its upsert operation
function mapRowToUpsert(row) {
  const parsedId = Number.parseInt(row.id);

  return {
    where: { id: parsedId },
    update: {},
    create: {
      title: row.title,
      author: row.author,
      genre: row.genre,
      year: Number.parseInt(row.year),
    },
  };
}

async function seed() {
  const csv = await readFile(csvPath, 'utf-8');

  const result = Papa.parse(csv, { header: true });

  // Upsert each row of book data into database
  await prisma.$transaction(async (tx) => {
    for (const row of result.data) {
      await tx.book.upsert(mapRowToUpsert(row));
    }
  });
}

let gotError = false;

try {
  await seed();
} catch (e) {
  console.error(e);
  gotError = true;
} finally {
  await prisma.$disconnect();
}

if (gotError) process.exit(1);
