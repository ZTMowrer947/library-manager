// Import
import http from "http";
import app from "./app";
import ormBootstrap from "./database";

// HTTP server setup
const server = http.createServer(app.callback());

// Port calculation
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 8080;

// Listeners
server.once("listening", () => {
    console.log(`Library Manager now running on port ${port}...`);
});

// Setup database connection
ormBootstrap().then(() => {
    console.log("Database connection successful.");

    // Configure HTTP server to listen on given port
    server.listen(port);
});
