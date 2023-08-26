import { join } from 'node:path';
import views from '@ladjs/koa-views';
import Koa from 'koa';
import { koaBody } from 'koa-body';
import mount from 'koa-mount';
import kStatic from 'koa-static';
import routes from './routes/index.js';

const app = new Koa();

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
  }),
);

// Routes
app.use(routes.routes());
app.use(routes.allowedMethods());

// Server initialization
app.listen(8080, () => {
  console.log('Server now listening on port 8080');
});
