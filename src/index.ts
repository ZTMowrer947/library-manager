import { join } from 'node:path';
import views from '@ladjs/koa-views';
import Koa from 'koa';
import { koaBody } from 'koa-body';
import mount from 'koa-mount';
import kStatic from 'koa-static';
import routes from '@/routes/index.js';
import errorNormalizer from '@/lib/middleware/errorNormalizer.js';
import errorHandler from '@/lib/middleware/errorHandler.js';
import { isHttpError } from 'http-errors';

const app = new Koa();

// Error handling
app.use(errorNormalizer);
app.use(errorHandler);
app.on('error', (err) => {
  if (isHttpError(err) && !err.expose && err.status !== 404 && process.env.NODE_ENV !== 'production') {
    console.error(err);
  }
});

// Paths
const viewsPath = join(process.cwd(), 'views');
const publicPath = join(process.cwd(), 'public');

// Middleware
app.use(koaBody());
app.use(mount('/public', kStatic(publicPath)));
app.use(
  views(viewsPath, {
    extension: 'hbs',
    map: {
      hbs: 'handlebars',
    },
    options: {
      partials: {
        layout: 'layout',
      },
    },
  }),
);

// Routes
app.use(routes.routes());
app.use(routes.allowedMethods());

// Server initialization
app.listen(8080, () => {
  console.log('Server now listening on port 8080');
});
