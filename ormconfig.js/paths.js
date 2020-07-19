// Imports
const path = require('path');

// Paths
const projectRootDir = path.resolve(__dirname, '..');
const projectSourceDir = path.resolve(projectRootDir, 'src');
const projectDistDir = path.resolve(projectRootDir, 'dist');

// Exports
module.exports = {
    projectRootDir,
    projectSourceDir,
    projectDistDir,
};
