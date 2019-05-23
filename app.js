// Imports
const express = require("express");
const routes = require("./routes");
const errorHandler = require("./middleware/errorHandler");

// App setup
const app = express();

// Configuration
app.disable("x-powered-by");    // Disable X-Powered-By header 
app.set("view engine", "pug");  // Set view engine to Pug

// Middleware
app.use("/public", express.static(`${__dirname}/public`));  // Provide static assets
app.use(express.urlencoded({ extended: true }));            // Parse urlencoded request body

// Routes
app.use(routes);

// Error handlers
app.use(errorHandler);

// Export
module.exports = app;
