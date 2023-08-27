import { object, coerce, number, string, nullable, nonempty, trimmed, Infer } from 'superstruct';

const NormalizedString = coerce(nullable(string()), string(), (str) => (str.length === 0 ? null : str));
const NumberyString = coerce(nullable(number()), NormalizedString, (str) => (str ? Number.parseInt(str) : null));

const BookSchema = object({
  title: nonempty(trimmed(string())),
  author: nonempty(trimmed(string())),
  genre: trimmed(NormalizedString),
  year: trimmed(NumberyString),
});

export default BookSchema;
export type BookInput = Infer<typeof BookSchema>;
