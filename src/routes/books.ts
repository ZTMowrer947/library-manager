import Router from '@koa/router';
import prisma from '@/lib/prisma.js';

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
bookRouter.get('/new', (ctx) => {
  ctx.throw(503);
});

// POST /books/new: Book creation
bookRouter.post('/new', (ctx) => {
  ctx.throw(503);
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
