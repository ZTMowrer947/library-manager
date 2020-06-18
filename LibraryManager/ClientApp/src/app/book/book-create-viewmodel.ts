import { Book } from './book';

export interface BookCreateViewmodel extends Omit<Book, 'id'> {}
