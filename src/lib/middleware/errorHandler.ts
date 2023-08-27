import { HttpError } from 'http-errors';
import { Next, ParameterizedContext } from 'koa';

/**
 * Informs the application that an error has occurred and renders an error view as appropriate.
 */
export default async function errorHandler<StateT, ContextT, ResponseBodyT>(
  ctx: ParameterizedContext<StateT, ContextT, ResponseBodyT>,
  next: Next,
) {
  try {
    await next();
  } catch (error) {
    const normalizedError = error as HttpError;

    ctx.app.emit('error', normalizedError);

    if (normalizedError.status === 404) {
      await ctx.render('not-found.hbs', {
        title: 'Not Found',
      });
    } else {
      await ctx.render('error', {
        title: 'Unexpected Error',
        message: normalizedError.expose ? normalizedError.message : 'An unexpected error occurred on our side.',
      });
    }
  }
}
