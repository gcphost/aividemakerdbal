import { DataSource } from 'typeorm';
import * as path from 'path';
import * as entities from './entities';

let _appDataSource: DataSource | null = null;

function createDataSource(): DataSource {
  if (_appDataSource) {
    return _appDataSource;
  }

  // Use a function to get the project root that works in both CommonJS and ESM
  let projectRoot: string;
  try {
    // Try ESM first (import.meta.url)
    if (typeof import.meta !== 'undefined' && import.meta.url) {
      const { fileURLToPath } = require('url');
      projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
    } else {
      // Fallback to CommonJS (__dirname)
      projectRoot = path.resolve(__dirname, '..');
    }
  } catch {
    // Final fallback
    projectRoot = process.cwd();
  }
  
  const dbPath = process.env.SQLITE_DB_PATH || path.join(projectRoot, 'data', 'sqlite', 'database.db');

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
