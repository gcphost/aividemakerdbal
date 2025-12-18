#!/bin/bash
echo "Updating app..."
cd app
rm -rf node_modules/shared-db
npm install --no-cache

echo "Updating socket-server..."
cd ../socket-server  
rm -rf node_modules/shared-db
npm install --no-cache

echo "Updating electron..."
cd ../electron
rm -rf node_modules/shared-db  
npm install --no-cache
npm run build

echo "✅ Update complete!"
