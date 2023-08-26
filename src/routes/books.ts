import Router from '@koa/router';

const bookRouter = new Router({
  prefix: '/books',
});

// Routes

// GET /books: Book listing
bookRouter.get('/', async (ctx) => {
  await ctx.render('index', { title: 'Books' });
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
bookRouter.get('/books/:id', (ctx) => {
  ctx.throw(503);
});

// POST /books/:id: Book update
bookRouter.post('/books/:id', (ctx) => {
  ctx.throw(503);
});

// GET /books/:id/delete: Book deletion confirmation
bookRouter.get('/books/:id/delete', (ctx) => {
  ctx.throw(503);
});

// POST /books/:id/delete: Book deletion
bookRouter.post('/books/:id/delete', (ctx) => {
  ctx.throw(503);
});

export default bookRouter;
