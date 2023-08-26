import Router from '@koa/router';
import bookRouter from '@/routes/books.js';

const routes = new Router();

// Routes
routes.use(bookRouter.routes());
routes.use(bookRouter.allowedMethods());

routes.get('/', (ctx) => {
  ctx.redirect('/books');
});

export default routes;
