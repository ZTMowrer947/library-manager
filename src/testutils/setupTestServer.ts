// Imports
import http from 'http';
import { apiResolver } from 'next/dist/next-server/server/api-utils';

// Test Server Helper
const setupTestServer = (handler: unknown, params?: Record<string, string | string[]>): http.Server => {
    return http.createServer(async (req, res) => {
        return apiResolver(req, res, params, handler, {
            previewModeId: '',
            previewModeEncryptionKey: '',
            previewModeSigningKey: '',
        });
    });
};

// Exports
export default setupTestServer;
