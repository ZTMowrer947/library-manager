import { Middleware } from 'koa';
import { create, Infer, Struct, StructError } from 'superstruct';

export type ParsedState<T, S, StateT> = StateT & {
  parsedBody?: Infer<Struct<T, S>>;
  validationErrors?: StructError;
};

type ValidateSchemaMiddleware<T, S, StateT, ContextT, ResponseBodyT> = Middleware<
  ParsedState<T, S, StateT>,
  ContextT,
  ResponseBodyT
>;

/**
 * Validates the request body using the given struct, and attempts to coerce it into
 * the struct-defined result type.
 *
 * If successful, the coerced object is attached to `ctx.state.parsedBody`, and
 * if it fails, the validation errors are attached to `ctx.state.validationErrors`.
 * @param struct The struct to use for validation.
 */
export default function validateSchema<T, S, StateT, ContextT, ResponseBodyT>(
  struct: Struct<T, S>,
): ValidateSchemaMiddleware<T, S, StateT, ContextT, ResponseBodyT> {
  return async (ctx, next) => {
    try {
      ctx.state.parsedBody = create(ctx.request.body, struct);

      await next();
    } catch (err) {
      if (err instanceof StructError) {
        ctx.state.validationErrors = err;

        await next();
      } else {
        throw err;
      }
    }
  };
}
