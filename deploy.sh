#!/bin/bash

# Shared-DB Deployment Script
# This script builds, commits, and pushes shared-db changes, then updates app, socket-server, and electron
# Usage: ./deploy.sh [commit message] [-f|--force]
#   -f, --force: Skip commit check and update dependencies even if no changes

set -e  # Exit on error

# Parse flags
FORCE=false
COMMIT_MSG="Update shared-db"

for arg in "$@"; do
    case $arg in
        -f|--force)
            FORCE=true
            ;;
        *)
            COMMIT_MSG="$arg"
            ;;
    esac
done

echo "🔨 Building shared-db..."
cd "$(dirname "$0")"
npm run build

echo "📝 Checking for changes..."
if [ -z "$(git status --porcelain)" ]; then
    if [ "$FORCE" = false ]; then
        echo "⚠️  No changes to commit (use -f or --force to update dependencies anyway)"
        exit 0
    else
        echo "⚠️  No changes to commit, but continuing due to --force flag"
    fi
else
    echo "📦 Committing changes..."
    git add -A
    git commit -m "$COMMIT_MSG"

    echo "🚀 Pushing to GitHub..."
    git push
fi

echo "🔄 Updating app..."
cd ../app
npm cache clean --force
rm -rf node_modules/shared-db package-lock.json
npm install

echo "🔄 Updating socket-server..."
cd ../socket-server
npm cache clean --force
rm -rf node_modules/shared-db package-lock.json
npm install

echo "🔄 Updating electron..."
cd ../electron
npm cache clean --force
rm -rf node_modules/shared-db package-lock.json
npm install
npm run build

echo "✅ Deployment complete!"

