#!/bin/bash

# Build frontend
cd todo-advanced
npm install
npm run build

# Setup backend
cd ../todo-backend
npm install

# Start the application
npm start 