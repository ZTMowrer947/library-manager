import express from 'express';
import routes from './routes';
import errorHandler from "./middleware/errorHandler";

// App setup
const app = express();

// Configuration
app.disable("x-powered-by");
app.set("view engine", "pug");

// Middleware
app.use("/public", express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(routes);

// Error handlers
app.use(errorHandler);

// Export
export default app;
