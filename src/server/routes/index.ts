// Imports
import { ParameterizedContext } from "koa";
import Router from "koa-router";
import BookListState from "../models/BookListState";

// Router setup
const router = new Router();

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

// Export
export default router;
