// Imports
const express = require("express");

// App setup
const app = express();

// Configuration
app.disable("x-powered-by");    // Disable X-Powered-By header 
app.set("view engine", "pug"); // Set view engine to Pug

// Routes

// Export
module.exports = app;
