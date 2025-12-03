"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformanceMetrics = exports.ProcessEstimate = exports.Process = exports.ApiKey = exports.Usage = exports.Settings = exports.Profile = exports.Channel = exports.File = exports.Video = exports.User = exports.AppDataSource = exports.getAppDataSource = void 0;
const typeorm_1 = require("typeorm");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const entities = __importStar(require("./entities"));
let _appDataSource = null;
function createDataSource() {
    if (_appDataSource) {
        return _appDataSource;
    }
    // Get the project root by finding the workspace root
    // Look for the workspace root by checking for multiple indicators
    let projectRoot = process.cwd();
    // Try to find the workspace root by looking for multiple indicators
    let currentPath = process.cwd();
    let found = false;
    const maxDepth = 10;
    let depth = 0;
    while (!found && depth < maxDepth) {
        // Check multiple indicators to identify the workspace root:
        // Primary: Has electron/, app/, and shared-db/ directories (definitive workspace structure)
        const hasElectronDir = fs.existsSync(path.join(currentPath, "electron"));
        const hasAppDir = fs.existsSync(path.join(currentPath, "app"));
        const hasSharedDbDir = fs.existsSync(path.join(currentPath, "shared-db"));
        // Workspace root MUST have electron/, app/, and shared-db/ directories
        if (hasElectronDir && hasAppDir && hasSharedDbDir) {
            projectRoot = currentPath;
            found = true;
        }
        else {
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
    // Migrations are now handled by check-and-fix-schema.ts script
    // Schema is auto-synced for new databases, and checked/fixed on startup for existing ones
    _appDataSource = new typeorm_1.DataSource({
        type: "better-sqlite3",
        database: dbPath,
        // Auto-sync schema on first run (new database)
        synchronize: isNewDatabase,
        migrationsRun: false, // Migrations disabled - use check-and-fix-schema.ts instead
        logging: ["schema", "error", "warn"], // Log schema changes and errors
        entities: Object.values(entities),
        migrations: [], // Migrations disabled - use check-and-fix-schema.ts instead
        subscribers: [],
        extra: {
            // Load sqlite-vec extension if available (for vector search support)
            // This allows TypeORM to query databases with vec0 virtual tables
            prepareDatabase: async (db) => {
                try {
                    // Try to load sqlite-vec extension if available
                    // This is optional - if the extension isn't available, we'll continue without it
                    // Use dynamic import with string to avoid TypeScript checking for the module
                    // sqlite-vec may not be installed in all packages (e.g., electron)
                    const sqliteVecModule = "sqlite-vec";
                    const sqliteVec = await Promise.resolve(`${sqliteVecModule}`).then(s => __importStar(require(s))).catch(() => null);
                    if (sqliteVec) {
                        if (db.loadExtension && typeof db.loadExtension === "function") {
                            if (typeof sqliteVec.getLoadablePath === "function") {
                                const extensionPath = sqliteVec.getLoadablePath();
                                db.loadExtension(extensionPath);
                                if (process.env.NODE_ENV !== "production") {
                                    console.log("[DB] ✅ Loaded sqlite-vec extension for TypeORM connection");
                                }
                            }
                            else if (sqliteVec.load && typeof sqliteVec.load === "function") {
                                sqliteVec.load(db);
                                if (process.env.NODE_ENV !== "production") {
                                    console.log("[DB] ✅ Loaded sqlite-vec extension for TypeORM connection (via load method)");
                                }
                            }
                        }
                    }
                }
                catch (error) {
                    // Silently fail - vec0 extension is optional
                    // Only log in development to avoid noise
                    if (process.env.NODE_ENV !== "production") {
                        console.warn("[DB] ⚠️ Could not load sqlite-vec extension (this is OK if vector search is not used):", error.message);
                    }
                }
            },
        },
    });
    return _appDataSource;
}
// Create DataSource lazily - only when actually accessed
const getAppDataSource = () => {
    return createDataSource();
};
exports.getAppDataSource = getAppDataSource;
// Export the actual DataSource instance (lazy creation)
exports.AppDataSource = createDataSource();
// Re-export entities to ensure they're the same references used in DataSource
var entities_1 = require("./entities");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return entities_1.User; } });
Object.defineProperty(exports, "Video", { enumerable: true, get: function () { return entities_1.Video; } });
Object.defineProperty(exports, "File", { enumerable: true, get: function () { return entities_1.File; } });
Object.defineProperty(exports, "Channel", { enumerable: true, get: function () { return entities_1.Channel; } });
Object.defineProperty(exports, "Profile", { enumerable: true, get: function () { return entities_1.Profile; } });
Object.defineProperty(exports, "Settings", { enumerable: true, get: function () { return entities_1.Settings; } });
Object.defineProperty(exports, "Usage", { enumerable: true, get: function () { return entities_1.Usage; } });
Object.defineProperty(exports, "ApiKey", { enumerable: true, get: function () { return entities_1.ApiKey; } });
Object.defineProperty(exports, "Process", { enumerable: true, get: function () { return entities_1.Process; } });
Object.defineProperty(exports, "ProcessEstimate", { enumerable: true, get: function () { return entities_1.ProcessEstimate; } });
Object.defineProperty(exports, "PerformanceMetrics", { enumerable: true, get: function () { return entities_1.PerformanceMetrics; } });
exports.default = exports.AppDataSource;
//# sourceMappingURL=data-source.js.map