import createHttpError, { isHttpError } from 'http-errors';
import { Next, ParameterizedContext } from 'koa';

/**
 * Normalizes any errors received during processing of the middleware chain
 * into `HttpError` instances if they are not already.
 */
export default async function errorNormalizer<StateT, ContextT, ResponseBodyT>(
  ctx: ParameterizedContext<StateT, ContextT, ResponseBodyT>,
  next: Next,
) {
  try {
    await next();
  } catch (error) {
    // If this is an HttpError, leave it as is
    if (isHttpError(error)) {
      throw error;
    }

    // If it's a different kind of error, extend it into an HttpError
    if (error instanceof Error) {
      throw createHttpError(500, error, { expose: false });
    }

    // Otherwise, give lame boring generic HttpError
    throw createHttpError(500, 'unexpected error');
  }
}
