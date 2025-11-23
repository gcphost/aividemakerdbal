#!/bin/bash

# Shared-DB Deployment Script
# This script builds, commits, and pushes shared-db changes, then updates app, socket-server, and electron

set -e  # Exit on error

echo "🔨 Building shared-db..."
cd "$(dirname "$0")"
npm run build

echo "📝 Checking for changes..."
if [ -z "$(git status --porcelain)" ]; then
    echo "⚠️  No changes to commit"
    exit 0
fi

echo "📦 Committing changes..."
git add -A
git commit -m "${1:-Update shared-db}"

echo "🚀 Pushing to GitHub..."
git push

echo "🔄 Updating app..."
cd ../app
npm cache clean --force
rm -rf node_modules/shared-db
npm install

echo "🔄 Updating socket-server..."
cd ../socket-server
npm cache clean --force
rm -rf node_modules/shared-db
npm install

echo "🔄 Updating electron..."
cd ../electron
npm cache clean --force
rm -rf node_modules/shared-db
npm install

echo "✅ Deployment complete!"

