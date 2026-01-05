#!/bin/bash

# Navigate to the footer component directory
cd /home/binhbb/frontend-component-footer-edx

echo "================================"
echo "Building Footer Component..."
echo "================================"

# Clean the old dist folder
rm -rf ./dist

echo "Removed old dist folder"

# Build using the Makefile
make build

echo "================================"
echo "Build complete!"
echo "================================"
echo ""
echo "Now restart your frontend-app-learning dev server:"
echo "  1. Stop the current server (Ctrl+C)"
echo "  2. Run: cd /home/binhbb/frontend-app-learning && npm start"
echo "  3. Clear browser cache and reload (Ctrl+Shift+R)"
