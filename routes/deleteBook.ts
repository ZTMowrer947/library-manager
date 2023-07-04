import { Router } from "express";
import asyncHandler from "express-async-handler";

// Router setup
const router = Router();
router.route("/")
    .get((req, res) => {
        res.locals.book = (req as any).book;
        res.locals.title = "Delete Confirmation";
        res.render("delete-confirm");
    }).post(asyncHandler(async (req, res) => {
        // Ensure that title from form data matches book title
        const titlesMatch = (req as any).book.title === req.body.title;
        if (titlesMatch) {
            await (req as any).bookService.delete((req as any).book);
            res.redirect("/books");
        } else {
            res.status(400);
            res.locals.titleInput = req.body.title;
            res.locals.error = new Error("Request body title does not match book title.");

            res.locals.book = (req as any).book;
            res.locals.title = "Delete Confirmation";
            res.render("delete-confirm");
        }
    }));

export default router;
