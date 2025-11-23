# Shared-DB Deployment Process

## ⚠️ CRITICAL: Always follow this process when making changes to shared-db

When you modify ANY file in the `shared-db` package, you MUST complete ALL of these steps:

### Required Steps (in order):

1. **Build the package**
   ```bash
   cd shared-db
   npm run build
   ```

2. **Commit and push to GitHub**
   ```bash
   git add -A
   git commit -m "Your commit message"
   git push
   ```

3. **Update app**
   ```bash
   cd ../app
   npm install
   ```

4. **Update socket-server**
   ```bash
   cd ../socket-server
   npm install
   ```

### Quick Deploy Script

You can use the included `deploy.sh` script:

```bash
cd shared-db
./deploy.sh "Your commit message"
```

Or make it executable and run:
```bash
chmod +x deploy.sh
./deploy.sh
```

### Why This Matters

- `shared-db` is a GitHub package used by both `app` and `socket-server`
- Changes must be pushed to GitHub before they're available
- Both consuming packages need `npm install` to pull the latest version
- **NEVER** change package.json to use local file references - always use the GitHub reference

### Files That Require Deployment

- Any file in `entities/` (especially `BaseEntity.ts`)
- `data-source.ts`
- `package.json`
- Any TypeScript file that affects exports

### Remember

- Build → Commit → Push → Update App → Update Socket-Server
- **ALL FIVE STEPS** must be completed
- Do not skip any step
- Do not change package.json references to local files

