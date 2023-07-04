// Imports
import http from "http";
import app from './app';

// HTTP Server Setup
const server = http.createServer(app);

// Listening on port 8080
server.listen(8080, () => {
    console.log("Library Manager is now running on http://localhost:8080");
    console.log("Press CTRL-C to exit at any time.");
});
