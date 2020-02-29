// Import
import "dotenv/config";
import "reflect-metadata";
import { Container } from "typedi";
import { useContainer } from "typeorm";
import app from "./app";
import ormBootstrap from "./database";
import http from "http";

// TypeDI Container setup
useContainer(Container);

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
