import { DataSource } from 'typeorm';
import * as path from 'path';
import * as fs from 'fs';
import * as entities from './entities';
// Import schemas for entities that use EntitySchema (no decorators)
import { UserSchema } from './entities/User.schema';
import { SettingsSchema } from './entities/Settings.schema';

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

  // Collect all entities - mix of decorator-based and schema-based
  const allEntities = [
    ...Object.values(entities),
    // Add EntitySchema-based entities (no decorators, no reflect-metadata needed)
    UserSchema,
    SettingsSchema,
  ];

  _appDataSource = new DataSource({
    type: 'better-sqlite3',
    database: dbPath,
    synchronize: false, // DISABLED FOR TESTING - manually managing schema
    logging: ['schema', 'error', 'warn'], // Log schema changes and errors
    entities: allEntities,
    migrations: [path.join(__dirname || process.cwd(), 'migrations', '*.ts')],
    subscribers: [],
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
export { User, Video, Chapter, File, Channel, Profile, Settings, Usage, ApiKey, BackgroundAudio, Process, ProcessEstimate, PerformanceMetrics } from './entities';

export default AppDataSource;
