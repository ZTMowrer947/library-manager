// Imports
const { STATUS_CODES } = require("http");

// Error handler
const errorHandler = (error, req, res, next) => {
    // If headers have already been sent,
    if (res.headersSent) {
        // Pass error to next error handler
        return next(error);
    }

    // If the current response status is not an error status,
    if (res.statusCode < 400)
        // Set it to 500 Internal Server Error
        res.status(500);

    // If the error is a 404 error,
    if (res.statusCode === 404) {
        // Set page title
        res.locals.title = "Page Not Found";

        // Render the 404 Error page
        res.render("not-found");
    } else {
        // Otherwise, set view locals
        res.locals.title = "Server Error";
        res.locals.error = error;

        // Render error page
        res.render("error");
    }
}

// Export
module.exports = errorHandler;
