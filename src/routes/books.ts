import Router from '@koa/router';
import { StructError } from 'superstruct';

import prisma from '@/lib/prisma.js';
import BookSchema from '@/schemas/book.js';
import createBook from '@/lib/query-helpers/createBook.js';
import validateSchema from '@/lib/middleware/validateSchema.js';
import selectBook from '@/lib/query-helpers/selectBook.js';
import { DefaultState } from 'koa';
import bookHasId from '@/lib/query-helpers/bookHasId.js';
import { Book } from '@prisma/client';

// Type
export type BookState<StateT> = StateT & {
  book: Pick<Book, 'id' | 'title' | 'author' | 'genre' | 'year'>;
};

const bookRouter = new Router({
  prefix: '/books',
});

// Helpers
function getErrorMessages(err?: StructError): string[] {
  // Gather an array of error messages for failed fields
  const failures = err?.failures() ?? [];

  return failures.map((failure) => {
    let message: string;
    if (Number.isNaN(failure.value)) {
      message = `${failure.key} must be numeric`;
    } else if (failure.refinement === 'nonempty') {
      message = `${failure.key} is required`;
    } else {
      message = failure.message;
    }

    return message;
  });
}

// Routes

// GET /books: Book listing
bookRouter.get('/', async (ctx) => {
  const books = await prisma.book.findMany({
    select: selectBook(),
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
    // Proceed with book creation
    await prisma.book.create({
      data: createBook(ctx.state.parsedBody),
    });

    ctx.redirect('/books');
  } else {
    // Re-render view with errors
    await ctx.render('new', {
      title: 'New Book',
      errors: getErrorMessages(ctx.state.validationErrors),
    });
  }
});

// GET /books/:id: Book update form
const bookByIdRouter = new Router<BookState<DefaultState>>();

// Resolve ID param to book
bookByIdRouter.param('id', async (id, ctx, next) => {
  const book = await prisma.book.findUnique({
    select: selectBook(),
    where: bookHasId(Number.parseInt(id)),
  });

  if (book) {
    ctx.state.book = book;

    await next();
  } else {
    ctx.throw(404, `No book with id ${id}`);
  }
});

bookByIdRouter.get('/:id', async (ctx) => {
  await ctx.render('detail', {
    title: ctx.state.book.title,
    book: ctx.state.book,
  });
});

// POST /books/:id: Book update
bookByIdRouter.post('/:id', validateSchema(BookSchema), async (ctx) => {
  if (ctx.state.parsedBody) {
    // Proceed with book creation
    await prisma.book.update({
      where: bookHasId(ctx.state.book.id),
      data: createBook(ctx.state.parsedBody),
    });

    ctx.redirect('/books');
  } else {
    // Re-render view
    await ctx.render('detail', {
      title: 'New Book',
      book: ctx.state.book,
      errors: getErrorMessages(ctx.state.validationErrors),
    });
  }
});

// GET /books/:id/delete: Book deletion confirmation
bookByIdRouter.get('/:id/delete', async (ctx) => {
  await ctx.render('delete', {
    title: 'Confirm Deletion',
    book: ctx.state.book,
  });
});

// POST /books/:id/delete: Book deletion
bookByIdRouter.post('/:id/delete', async (ctx) => {
  // Verify that provided title matches book title
  if (ctx.request.body.title?.trim() === ctx.state.book.title) {
    await prisma.book.delete({
      where: bookHasId(ctx.state.book.id),
    });

    ctx.redirect('/');
  } else {
    await ctx.render('delete', {
      title: 'Confirm Deletion',
      book: ctx.state.book,
      error: 'Entered title does not match',
    });
  }
});

bookRouter.use(bookByIdRouter.routes());
bookRouter.use(bookByIdRouter.allowedMethods());

export default bookRouter;
