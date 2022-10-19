const { PrismaClient } = require('@prisma/client')
const fs = require("fs/promises")
const Papa = require("papaparse");

const prisma = new PrismaClient()

function wait(ms) {
    return new Promise(resolve => setTimeout(() => resolve(), ms))
}

async function main() {
    const csv = await fs.readFile(`${__dirname}/../Books.csv`, 'utf8');

    const { data: csvData } = Papa.parse(csv, { header: true });

    const data = csvData.map(record => ({
        ...record,
        id: Number.parseInt(record.id),
        year: Number.parseInt(record.year)
    }))

    const upserts = data.map((record, index) => wait(100 * (index + 1)).then(() => prisma.book.upsert({
        where: { id: record.id },
        update: {},
        create: record,
    })));

    await Promise.all(upserts)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
