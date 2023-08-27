import Router from '@koa/router';
import { create } from 'superstruct';

import prisma from '@/lib/prisma.js';
import BookSchema from '@/schemas/book.js';
import createBook from '@/lib/query-helpers/createBook.js';
import validateSchema from '@/lib/middleware/validateSchema.js';

const bookRouter = new Router({
  prefix: '/books',
});

// Routes

// GET /books: Book listing
bookRouter.get('/', async (ctx) => {
  const books = await prisma.book.findMany({
    select: {
      id: true,
      title: true,
      author: true,
      genre: true,
      year: true,
    },
  });

  await ctx.render('index', { title: 'Books', books });
});

// GET /books/new: Book creation form
bookRouter.get('/new', async (ctx) => {
  await ctx.render('new', { title: 'New Book' });
});

// POST /books/new: Book creation
bookRouter.post('/new', validateSchema(BookSchema), async (ctx) => {
  if (ctx.state.parsedBody) {
    // Attempt to coerce body into book input structure
    const bookData = create(ctx.request.body, BookSchema);

    // Proceed with book creation
    await prisma.book.create({
      data: createBook(bookData),
    });

    ctx.redirect('/books');
  } else {
    // Validation failed, so we'll now gather an array of error messages for failed fields
    const errors: string[] = [];

    for (const failure of ctx.state.validationErrors?.failures() ?? []) {
      let message: string;
      if (Number.isNaN(failure.value)) {
        message = `${failure.key} must be numeric`;
      } else if (failure.refinement === 'nonempty') {
        message = `${failure.key} is required`;
      } else {
        message = failure.message;
      }

      errors.push(message);
    }

    // Re-render view
    await ctx.render('new', { title: 'New Book', errors });
  }
});

// GET /books/:id: Book update form
bookRouter.get('/:id', (ctx) => {
  ctx.throw(503);
});

// POST /books/:id: Book update
bookRouter.post('/:id', (ctx) => {
  ctx.throw(503);
});

// GET /books/:id/delete: Book deletion confirmation
bookRouter.get('/:id/delete', (ctx) => {
  ctx.throw(503);
});

// POST /books/:id/delete: Book deletion
bookRouter.post('/:id/delete', (ctx) => {
  ctx.throw(503);
});

export default bookRouter;
