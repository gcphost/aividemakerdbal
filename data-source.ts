import { DataSource } from "typeorm";
import * as path from "path";
import * as fs from "fs";
import * as entities from "./entities";

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
    const hasDataSqliteDir = fs.existsSync(path.join(currentPath, "data", "sqlite"));
    const hasDataDir = fs.existsSync(path.join(currentPath, "data"));

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
    : path.resolve(projectRoot, "data", "sqlite", "database.db");

  // Ensure the database directory exists
  const dbDir = path.dirname(dbPath);
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  // Check if this is a new database (doesn't exist or is empty)
  // If new, we'll enable synchronize to create the schema automatically
  const isNewDatabase = !fs.existsSync(dbPath) || fs.statSync(dbPath).size === 0;

  // Log the database path for debugging
  console.log(`[DB] ========== Database Configuration ==========`);
  console.log(`[DB] process.cwd(): ${process.cwd()}`);
  console.log(`[DB] Project root: ${projectRoot}`);
  console.log(`[DB] SQLITE_DB_PATH env var: ${process.env.SQLITE_DB_PATH || "NOT SET"}`);
  console.log(`[DB] Final database path: ${dbPath}`);
  console.log(`[DB] Database file exists: ${fs.existsSync(dbPath)}`);
  if (fs.existsSync(dbPath)) {
    const stats = fs.statSync(dbPath);
    console.log(`[DB] Database file size: ${stats.size} bytes`);
    console.log(`[DB] Database file modified: ${stats.mtime}`);
  }
  console.log(`[DB] New database (will sync schema): ${isNewDatabase}`);
  console.log(`[DB] ===========================================`);

  // Migrations are in shared-db/dist/migrations (compiled) - check there first
  // Also check electron/migrations for backward compatibility
  const possibleMigrationsPaths = [
    path.join(__dirname, "dist", "migrations"), // Compiled JS in shared-db/dist/migrations
    path.join(projectRoot, "shared-db", "dist", "migrations"), // Compiled JS (when running from project root)
    path.join(projectRoot, "electron", "dist", "migrations"), // Compiled JS (backward compatibility)
    path.join(projectRoot, "electron", "migrations"), // Source TS (backward compatibility)
  ];

  let migrationsDir: string;
  let migrationsPattern: string;

  // Find the first existing migrations directory
  let foundMigrationsDir: string | null = null;
  for (const possiblePath of possibleMigrationsPaths) {
    if (fs.existsSync(possiblePath)) {
      foundMigrationsDir = possiblePath;
      break;
    }
  }

  if (foundMigrationsDir) {
    migrationsDir = foundMigrationsDir;
    // Check if we have .js or .ts files
    const hasJsFiles = fs.readdirSync(migrationsDir).some(f => f.endsWith(".js"));
    const hasTsFiles = fs.readdirSync(migrationsDir).some(f => f.endsWith(".ts"));

    if (hasJsFiles) {
      migrationsPattern = path.join(migrationsDir, "*.js");
    } else if (hasTsFiles) {
      migrationsPattern = path.join(migrationsDir, "*.ts");
    } else {
      // Default to .js if we can't determine
      migrationsPattern = path.join(migrationsDir, "*.js");
    }
  } else {
    // Fallback: use electron/migrations
    migrationsDir = path.join(projectRoot, "electron", "migrations");
    migrationsPattern = path.join(migrationsDir, "*.ts");
  }

  // Log migration path for debugging
  if (process.env.NODE_ENV !== "production") {
    console.log(`[DB] Migrations directory: ${migrationsDir}`);
    console.log(`[DB] Migrations pattern: ${migrationsPattern}`);
    console.log(`[DB] Migrations directory exists: ${fs.existsSync(migrationsDir)}`);
    if (fs.existsSync(migrationsDir)) {
      const files = fs
        .readdirSync(migrationsDir)
        .filter(f => f.endsWith(".ts") || f.endsWith(".js"));
      console.log(`[DB] Found ${files.length} migration file(s)`);
    }
  }

  _appDataSource = new DataSource({
    type: "better-sqlite3",
    database: dbPath,
    // Auto-sync schema on first run (new database), otherwise use migrations
    synchronize: isNewDatabase,
    migrationsRun: !isNewDatabase, // Only run migrations on existing databases
    logging: ["schema", "error", "warn", "migration"], // Log schema changes, errors, and migrations
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
          const sqliteVecModule = "sqlite-vec";
          const sqliteVec = await import(/* @ts-ignore */ sqliteVecModule).catch(() => null);
          if (sqliteVec) {
            if (db.loadExtension && typeof db.loadExtension === "function") {
              if (typeof sqliteVec.getLoadablePath === "function") {
                const extensionPath = sqliteVec.getLoadablePath();
                db.loadExtension(extensionPath);
                if (process.env.NODE_ENV !== "production") {
                  console.log("[DB] ✅ Loaded sqlite-vec extension for TypeORM connection");
                }
              } else if (sqliteVec.load && typeof sqliteVec.load === "function") {
                sqliteVec.load(db);
                if (process.env.NODE_ENV !== "production") {
                  console.log(
                    "[DB] ✅ Loaded sqlite-vec extension for TypeORM connection (via load method)"
                  );
                }
              }
            }
          }
        } catch (error: any) {
          // Silently fail - vec0 extension is optional
          // Only log in development to avoid noise
          if (process.env.NODE_ENV !== "production") {
            console.warn(
              "[DB] ⚠️ Could not load sqlite-vec extension (this is OK if vector search is not used):",
              error.message
            );
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
export {
  User,
  Video,
  Chapter,
  File,
  Channel,
  Profile,
  Settings,
  Usage,
  ApiKey,
  Process,
  ProcessEstimate,
  PerformanceMetrics,
} from "./entities";

export default AppDataSource;
