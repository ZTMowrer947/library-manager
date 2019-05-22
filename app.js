// Imports
const express = require("express");
const routes = require("./routes");

// App setup
const app = express();

// Configuration
app.disable("x-powered-by");    // Disable X-Powered-By header 
app.set("view engine", "pug"); // Set view engine to Pug

// Routes
app.use(routes);

// Export
module.exports = app;
