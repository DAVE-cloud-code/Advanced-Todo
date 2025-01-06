const { execSync } = require('child_process');
const path = require('path');

// Build frontend
console.log('Building frontend...');
execSync('cd todo-advanced && npm run build', { stdio: 'inherit' });

// Copy frontend build to backend
console.log('Copying frontend build to backend...');
execSync('cp -r todo-advanced/dist todo-backend/public', { stdio: 'inherit' });

// Install backend dependencies
console.log('Installing backend dependencies...');
execSync('cd todo-backend && npm install --production', { stdio: 'inherit' });

console.log('Build complete!'); 