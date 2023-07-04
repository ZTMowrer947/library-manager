import { Router } from "express";
import asyncHandler from "express-async-handler";
import deleteBook from "./deleteBook";

// Router setup
const router = Router();
router.route("/")
    .get((req, res) => {
        res.locals.book = (req as any).book;
        res.locals.title = "Book Details";
        res.render("update-book");
    }).post(asyncHandler(async (req, res) => {
        try {
            // Attach book to locals form
            res.locals.book = await (req as any).bookService.update((req as any).book, req.body);

            // Redirect to book listing
            res.redirect("/books");
        } catch (error) {
            res.status(400);
            // Attach errors to view locals
            res.locals.errors = (error as any).errors;

            res.locals.title = "Book Details";
            res.locals.book = (req as any).book;
            res.render("update-book");
        }
    }));

router.use("/delete", deleteBook);

export default router;
