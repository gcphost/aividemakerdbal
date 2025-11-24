import { DataSource } from 'typeorm';
import * as path from 'path';
import * as fs from 'fs';
import * as entities from './entities';

let _appDataSource: DataSource | null = null;

function createDataSource(): DataSource {
  if (_appDataSource) {
    return _appDataSource;
  }

  // Get the project root by finding the workspace root (where data directory exists)
  // This ensures consistency regardless of where the code is executed from
  let projectRoot: string = process.cwd();
  
  // Try to find the workspace root by looking for the data directory
  // This is the most reliable indicator of the workspace root
  let currentPath = process.cwd();
  let found = false;
  const maxDepth = 10;
  let depth = 0;
  
  while (!found && depth < maxDepth) {
    // Check if this is the workspace root (has data/sqlite directory)
    const hasDataSqliteDir = fs.existsSync(path.join(currentPath, 'data', 'sqlite'));
    const hasDataDir = fs.existsSync(path.join(currentPath, 'data'));
    
    // Primary indicator: data/sqlite directory exists (where the database should be)
    // Secondary: data directory exists (workspace structure)
    if (hasDataSqliteDir || hasDataDir) {
      projectRoot = currentPath;
      found = true;
    } else {
      const parentPath = path.dirname(currentPath);
      if (parentPath === currentPath) {
        // Reached filesystem root
        break;
      }
      currentPath = parentPath;
      depth++;
    }
  }
  
  // If we couldn't find the workspace root, use process.cwd() as fallback
  if (!found) {
    projectRoot = process.cwd();
  }
  
  const dbPath = process.env.SQLITE_DB_PATH 
    ? path.resolve(process.env.SQLITE_DB_PATH)
    : path.resolve(projectRoot, 'data', 'sqlite', 'database.db');
  
  // Ensure the database directory exists
  const dbDir = path.dirname(dbPath);
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }
  
  // Log the database path for debugging (only in development)
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[DB] ========== Database Configuration ==========`);
    console.log(`[DB] process.cwd(): ${process.cwd()}`);
    console.log(`[DB] Project root: ${projectRoot}`);
    console.log(`[DB] SQLITE_DB_PATH env var: ${process.env.SQLITE_DB_PATH || 'NOT SET'}`);
    console.log(`[DB] Final database path: ${dbPath}`);
    console.log(`[DB] Database file exists: ${fs.existsSync(dbPath)}`);
    if (fs.existsSync(dbPath)) {
      const stats = fs.statSync(dbPath);
      console.log(`[DB] Database file size: ${stats.size} bytes`);
      console.log(`[DB] Database file modified: ${stats.mtime}`);
    }
    console.log(`[DB] ===========================================`);
  }

  // Determine migrations path - support both TypeScript (dev) and JavaScript (compiled)
  // Check if we're running from compiled code (dist folder) or source
  const isCompiled = __dirname?.includes('dist') || __dirname?.includes('node_modules');
  const migrationsDir = path.join(__dirname || process.cwd(), 'migrations');
  
  // Try to find migrations - check both .ts and .js patterns
  // TypeORM will use whichever pattern matches files that exist
  const migrationsPattern = isCompiled
    ? path.join(migrationsDir, '*.js')  // Compiled migrations
    : path.join(migrationsDir, '*.ts'); // Source migrations
  
  // Log migration path for debugging
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[DB] Migrations pattern: ${migrationsPattern}`);
    console.log(`[DB] Migrations directory exists: ${require('fs').existsSync(migrationsDir)}`);
  }

  _appDataSource = new DataSource({
    type: 'better-sqlite3',
    database: dbPath,
    synchronize: false, // Keep false - use migrations instead
    migrationsRun: true, // Auto-run pending migrations on startup
    logging: ['schema', 'error', 'warn', 'migration'], // Log schema changes, errors, and migrations
    entities: Object.values(entities),
    migrations: [migrationsPattern],
    subscribers: [],
    extra: {
      // Load sqlite-vec extension if available (for vector search support)
      // This allows TypeORM to query databases with vec0 virtual tables
      prepareDatabase: async (db: any) => {
        try {
          // Try to load sqlite-vec extension if available
          // This is optional - if the extension isn't available, we'll continue without it
          // Use dynamic import with string to avoid TypeScript checking for the module
          // sqlite-vec may not be installed in all packages (e.g., electron)
          const sqliteVecModule = 'sqlite-vec';
          const sqliteVec = await import(/* @ts-ignore */ sqliteVecModule).catch(() => null);
          if (sqliteVec) {
            if (db.loadExtension && typeof db.loadExtension === 'function') {
              if (typeof sqliteVec.getLoadablePath === 'function') {
                const extensionPath = sqliteVec.getLoadablePath();
                db.loadExtension(extensionPath);
                if (process.env.NODE_ENV !== 'production') {
                  console.log('[DB] ✅ Loaded sqlite-vec extension for TypeORM connection');
                }
              } else if (sqliteVec.load && typeof sqliteVec.load === 'function') {
                sqliteVec.load(db);
                if (process.env.NODE_ENV !== 'production') {
                  console.log('[DB] ✅ Loaded sqlite-vec extension for TypeORM connection (via load method)');
                }
              }
            }
          }
        } catch (error: any) {
          // Silently fail - vec0 extension is optional
          // Only log in development to avoid noise
          if (process.env.NODE_ENV !== 'production') {
            console.warn('[DB] ⚠️ Could not load sqlite-vec extension (this is OK if vector search is not used):', error.message);
          }
        }
      },
    },
  });

  return _appDataSource;
}

// Create DataSource lazily - only when actually accessed
export const getAppDataSource = (): DataSource => {
  return createDataSource();
};

// Export the actual DataSource instance (lazy creation)
export const AppDataSource = createDataSource();

// Re-export entities to ensure they're the same references used in DataSource
export { User, Video, Chapter, File, Channel, Profile, Settings, Usage, ApiKey, Process, ProcessEstimate, PerformanceMetrics } from './entities';

export default AppDataSource;
