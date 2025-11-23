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
    console.log(`[DB] Database path: ${dbPath}`);
    console.log(`[DB] Project root: ${projectRoot}`);
  }

  _appDataSource = new DataSource({
    type: 'better-sqlite3',
    database: dbPath,
    synchronize: true, // Auto-create tables for now (can be changed to false later with migrations)
    logging: false,
    entities: Object.values(entities),
    migrations: [path.join(__dirname || process.cwd(), 'migrations', '*.ts')],
    subscribers: [],
  });

  return _appDataSource;
}

// Create DataSource lazily - only when actually accessed
export const getAppDataSource = (): DataSource => {
  return createDataSource();
};

// For backward compatibility, export a getter object that doesn't trigger DataSource creation
export const AppDataSource = {
  get isInitialized() { return _appDataSource?.isInitialized || false; },
  get driver() { return _appDataSource?.driver; },
  get manager() { return _appDataSource?.manager; },
  get options() { return _appDataSource?.options; },
  async initialize() { return createDataSource().initialize(); },
  async destroy() { return _appDataSource?.destroy(); },
  getRepository(entity: any) { return createDataSource().getRepository(entity); },
  getTreeRepository(entity: any) { return createDataSource().getTreeRepository(entity); },
  getMongoRepository(entity: any) { return createDataSource().getMongoRepository(entity); },
} as DataSource;

// Re-export entities to ensure they're the same references used in DataSource
export { User, Video, Chapter, File, Channel, Profile, Settings, Usage, ApiKey, BackgroundAudio, Process, ProcessEstimate, PerformanceMetrics } from './entities';

export default AppDataSource;
