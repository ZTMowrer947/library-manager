import Router from '@koa/router';

const routes = new Router();

// Routes
routes.get('/', async (ctx) => {
  await ctx.render('index', { title: 'Books' });
});

export default routes;
