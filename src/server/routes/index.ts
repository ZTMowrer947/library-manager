// Imports
import { ParameterizedContext } from "koa";
import Router from "koa-router";
import BookListState from "../models/BookListState";

// Custom contexts
interface RenderContext {
    render: (view: string) => Promise<void>;
}

// Router setup
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const router = new Router<any, RenderContext>();

// Routes
// GET /: Redirect link to /books
router.get("/", async ctx => {
    ctx.redirect("/books");
});

// GET /books: Book listing
router.get("/books", async (ctx: ParameterizedContext<BookListState>) => {
    // Get book listing
    const books = await ctx.state.bookService.getList();

    // Attach books to state
    ctx.state.books = books;

    // Render index page
    await ctx.render("index");
});

// GET /books/new: New Book Form
router.get("/books/new", async ctx => {
    // Render new book form
    await ctx.render("new-book");
});

// Export
export default router;
