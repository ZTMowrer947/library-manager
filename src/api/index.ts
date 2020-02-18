// Imports
import { Router } from 'express';

// API Router setup
const api = Router();

// Routes
api.get('/', (req, res) => {
    // Test message to check if API is operational
    res.json({
        message: 'Welcome to the Library Manager API.',
    });
});

// Export
export default api;
