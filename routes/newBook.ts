import { Router } from "express";

// Router setup
const router = Router();
router.route("/")
    .get((req, res) => {
        res.locals.title = "Create Book";
        res.render("new-book");
    }).post(async (req, res) => {
        try {
            res.locals.book = await (req as any).bookService.create(req.body);
            res.redirect("/books");
        } catch (error) {
            res.status(400);

            // Attach errors to view locals
            res.locals.errors = (error as any).errors;

            res.locals.title = "Create Book";
            res.render("new-book");
        }
    });

export default router;
