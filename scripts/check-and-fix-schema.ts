import "reflect-metadata";
import { getAppDataSource } from "../data-source";
import Database from "better-sqlite3";

/**
 * Unified schema check and fix script that replaces migrations.
 * This script runs on app startup (blocking) to ensure the database schema is up to date.
 */
export async function checkAndFixSchema(): Promise<void> {
  console.log("[Schema Check] Starting database schema check...");

  const dataSource = getAppDataSource();

  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }

  const dbPath = process.env.SQLITE_DB_PATH || (dataSource.options.database as string);
  console.log(`[Schema Check] Using database: ${dbPath}`);

  const db = new Database(dbPath);

  try {
    let changesMade = false;

    // Helper to check if a column exists
    const columnExists = (tableName: string, columnName: string): boolean => {
      const tableInfo = db.prepare(`PRAGMA table_info("${tableName}")`).all() as Array<{
        name: string;
        type: string;
      }>;
      return tableInfo.some(col => col.name === columnName);
    };

    // Helper to get column type
    const getColumnType = (tableName: string, columnName: string): string | null => {
      const tableInfo = db.prepare(`PRAGMA table_info("${tableName}")`).all() as Array<{
        name: string;
        type: string;
      }>;
      const col = tableInfo.find(c => c.name === columnName);
      return col ? col.type.toUpperCase() : null;
    };

    // Helper to check if migration is needed (column exists and is VARCHAR when it should be INTEGER)
    const needsTypeFix = (table: string, column: string): boolean => {
      const type = getColumnType(table, column);
      return type !== null && type === "VARCHAR";
    };

    // 1. Add systemUsage column to settings if missing
    if (!columnExists("settings", "systemUsage")) {
      console.log("[Schema Check] Adding systemUsage column to settings table...");
      db.prepare(`ALTER TABLE "settings" ADD COLUMN "systemUsage" varchar`).run();
      changesMade = true;
      console.log("[Schema Check] ✅ Added systemUsage column to settings");
    }

    // 2. Fix users.isActive if needed (varchar -> integer)
    if (needsTypeFix("users", "isActive")) {
      console.log("[Schema Check] Fixing users.isActive column type...");
      await fixBooleanColumn(db, "users", "isActive", 1);
      changesMade = true;
    }

    // 3. Fix settings.notifications and emailNotifications if needed
    if (needsTypeFix("settings", "notifications")) {
      console.log("[Schema Check] Fixing settings boolean columns...");
      await fixBooleanColumns(db, "settings", ["notifications", "emailNotifications"], 1);
      changesMade = true;
    }

    // 4. Fix channels boolean/integer columns if needed
    if (needsTypeFix("channels", "isConnected") || needsTypeFix("channels", "defaultMadeForKids")) {
      console.log("[Schema Check] Fixing channels boolean/integer columns...");
      await fixChannelsColumns(db);
      changesMade = true;
    }

    // 5. Fix files.isPublic if needed
    if (needsTypeFix("files", "isPublic")) {
      console.log("[Schema Check] Fixing files.isPublic column type...");
      await fixBooleanColumn(db, "files", "isPublic", 0);
      changesMade = true;
    }

    // 6. Fix api_keys.isActive if needed
    if (needsTypeFix("api_keys", "isActive")) {
      console.log("[Schema Check] Fixing api_keys.isActive column type...");
      await fixApiKeysIsActive(db);
      changesMade = true;
    }

    // 7. Add missing optional columns
    const optionalColumns = [
      { table: "video", column: "desiredResolution", type: "TEXT", nullable: true },
      { table: "profiles", column: "imageModel", type: "TEXT", nullable: true },
      { table: "profiles", column: "autoGenerateVideos", type: "INTEGER", nullable: true },
      { table: "profiles", column: "disableVideoGeneration", type: "INTEGER", nullable: true },
      { table: "profiles", column: "videoStylePrompt", type: "VARCHAR", nullable: true },
      { table: "profiles", column: "audio", type: "VARCHAR", nullable: true },
      { table: "channel", column: "descriptionFooter", type: "TEXT", nullable: true },
    ];

    for (const { table, column, type, nullable } of optionalColumns) {
      if (!columnExists(table, column)) {
        console.log(`[Schema Check] Adding ${table}.${column} column...`);
        const nullableClause = nullable ? "" : " NOT NULL";
        db.prepare(`ALTER TABLE "${table}" ADD COLUMN "${column}" ${type}${nullableClause}`).run();
        changesMade = true;
        console.log(`[Schema Check] ✅ Added ${table}.${column}`);
      }
    }

    if (changesMade) {
      console.log("[Schema Check] ✅ Schema updates completed");
    } else {
      console.log("[Schema Check] ✅ Schema is up to date");
    }
  } catch (error: any) {
    console.error("[Schema Check] ❌ Error checking/fixing schema:", error);
    throw error;
  } finally {
    db.close();
  }
}

/**
 * Fix a boolean column by recreating the table
 */
async function fixBooleanColumn(
  db: Database.Database,
  tableName: string,
  columnName: string,
  defaultValue: number
): Promise<void> {
  // Get existing column names
  const tableInfo = db.prepare(`PRAGMA table_info("${tableName}")`).all() as Array<{
    name: string;
  }>;
  const columnNames = tableInfo.map(col => col.name);
  const hasCol = (name: string) => columnNames.includes(name);

  // Create backup table
  db.prepare(`ALTER TABLE "${tableName}" RENAME TO "${tableName}_backup"`).run();

  // Get entity metadata to recreate table properly
  // For users table
  if (tableName === "users") {
    db.prepare(
      `
      CREATE TABLE "users" (
        "_id" varchar PRIMARY KEY NOT NULL,
        "email" varchar NOT NULL UNIQUE,
        "password" varchar NOT NULL,
        "firstName" varchar,
        "lastName" varchar,
        "avatarUrl" varchar,
        "role" varchar NOT NULL DEFAULT ('user'),
        "isActive" integer NOT NULL DEFAULT (1),
        "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
        "updatedAt" datetime NOT NULL DEFAULT (datetime('now')),
        ${hasCol("defaultProfileId") ? '"defaultProfileId" varchar' : ""}
      )
    `
    ).run();

    const selectCols = [
      '"_id"',
      '"email"',
      '"password"',
      '"firstName"',
      '"lastName"',
      '"avatarUrl"',
      '"role"',
      `CASE WHEN "isActive" IN ('1', 'true', '1.0') OR "isActive" = 1 THEN 1 ELSE 0 END`,
      '"createdAt"',
      '"updatedAt"',
      hasCol("defaultProfileId") ? '"defaultProfileId"' : "NULL",
    ]
      .filter(Boolean)
      .join(", ");

    db.prepare(`INSERT INTO "users" SELECT ${selectCols} FROM "${tableName}_backup"`).run();
  } else if (tableName === "files") {
    // For files table - need to preserve all columns
    const fileCols = db.prepare(`PRAGMA table_info("${tableName}_backup")`).all() as Array<{
      name: string;
    }>;
    const fileColNames = fileCols.map(c => c.name);
    const hasFileCol = (name: string) => fileColNames.includes(name);

    // Build CREATE TABLE with all columns
    const createCols = [
      '"_id" varchar PRIMARY KEY NOT NULL',
      '"userId" varchar NOT NULL',
      '"filename" varchar NOT NULL',
      hasFileCol("mimeType") ? '"mimeType" varchar' : "",
      '"size" varchar NOT NULL',
      hasFileCol("path") ? '"path" varchar' : "",
      hasFileCol("url") ? '"url" varchar' : "",
      hasFileCol("thumbnailUrl") ? '"thumbnailUrl" varchar' : "",
      hasFileCol("publicUrl") ? '"publicUrl" varchar' : "",
      "\"status\" varchar NOT NULL DEFAULT ('draft')",
      hasFileCol("type") ? '"type" varchar' : "",
      hasFileCol("category") ? '"category" varchar' : "",
      hasFileCol("title") ? '"title" varchar NOT NULL' : '"filename" varchar NOT NULL',
      hasFileCol("description") ? '"description" varchar' : "",
      hasFileCol("prompt") ? '"prompt" varchar' : "",
      hasFileCol("volume") ? '"volume" varchar' : "",
      hasFileCol("loop") ? '"loop" varchar' : "",
      hasFileCol("hash") ? '"hash" varchar' : "",
      hasFileCol("metadata") ? '"metadata" text' : "",
      hasFileCol("vectorEmbedding") ? '"vectorEmbedding" text' : "",
      hasFileCol("versions") ? '"versions" text' : "",
      hasFileCol("references") ? '"references" text' : "",
      '"isPublic" integer NOT NULL DEFAULT (0)',
      hasFileCol("expiresAt") ? '"expiresAt" datetime' : "",
      hasFileCol("lastAccessedAt") ? '"lastAccessedAt" datetime' : "",
      "\"createdAt\" datetime NOT NULL DEFAULT (datetime('now'))",
      "\"updatedAt\" datetime NOT NULL DEFAULT (datetime('now'))",
      hasFileCol("versionNumber") ? '"versionNumber" integer DEFAULT 1' : "",
      hasFileCol("parentVersionId") ? '"parentVersionId" varchar' : "",
      hasFileCol("versionChainId") ? '"versionChainId" varchar' : "",
      hasFileCol("isCurrentVersion") ? '"isCurrentVersion" boolean DEFAULT 1' : "",
      hasFileCol("versionChange") ? '"versionChange" text' : "",
      hasFileCol("duration") ? '"duration" real' : "",
    ]
      .filter(Boolean)
      .join(", ");

    db.prepare(`CREATE TABLE "files" (${createCols})`).run();

    const selectCols = [
      '"_id"',
      '"userId"',
      '"filename"',
      hasFileCol("mimeType") ? '"mimeType"' : "NULL",
      '"size"',
      hasFileCol("path") ? '"path"' : "NULL",
      hasFileCol("url") ? '"url"' : "NULL",
      hasFileCol("thumbnailUrl") ? '"thumbnailUrl"' : "NULL",
      hasFileCol("publicUrl") ? '"publicUrl"' : "NULL",
      '"status"',
      hasFileCol("type") ? '"type"' : "NULL",
      hasFileCol("category") ? '"category"' : "NULL",
      hasFileCol("title") ? '"title"' : '"filename"',
      hasFileCol("description") ? '"description"' : "NULL",
      hasFileCol("prompt") ? '"prompt"' : "NULL",
      hasFileCol("volume") ? '"volume"' : "NULL",
      hasFileCol("loop") ? '"loop"' : "NULL",
      hasFileCol("hash") ? '"hash"' : "NULL",
      hasFileCol("metadata") ? '"metadata"' : "NULL",
      hasFileCol("vectorEmbedding") ? '"vectorEmbedding"' : "NULL",
      hasFileCol("versions") ? '"versions"' : "NULL",
      hasFileCol("references") ? '"references"' : "NULL",
      `CASE WHEN "isPublic" IN ('1', 'true', '1.0') OR "isPublic" = 1 THEN 1 ELSE 0 END`,
      hasFileCol("expiresAt") ? '"expiresAt"' : "NULL",
      hasFileCol("lastAccessedAt") ? '"lastAccessedAt"' : "NULL",
      '"createdAt"',
      '"updatedAt"',
      hasFileCol("versionNumber") ? '"versionNumber"' : "1",
      hasFileCol("parentVersionId") ? '"parentVersionId"' : "NULL",
      hasFileCol("versionChainId") ? '"versionChainId"' : "NULL",
      hasFileCol("isCurrentVersion") ? '"isCurrentVersion"' : "1",
      hasFileCol("versionChange") ? '"versionChange"' : "NULL",
      hasFileCol("duration") ? '"duration"' : "NULL",
    ]
      .filter(Boolean)
      .join(", ");

    db.prepare(`INSERT INTO "files" SELECT ${selectCols} FROM "${tableName}_backup"`).run();
  }

  // Drop backup table
  db.prepare(`DROP TABLE "${tableName}_backup"`).run();
  console.log(`[Schema Check] ✅ Fixed ${tableName}.${columnName}`);
}

/**
 * Fix multiple boolean columns in settings table
 */
async function fixBooleanColumns(
  db: Database.Database,
  tableName: string,
  columnNames: string[],
  defaultValue: number
): Promise<void> {
  db.prepare(`ALTER TABLE "${tableName}" RENAME TO "${tableName}_backup"`).run();

  db.prepare(
    `
    CREATE TABLE "settings" (
      "_id" varchar PRIMARY KEY NOT NULL,
      "userId" varchar NOT NULL,
      "theme" varchar,
      "notifications" integer NOT NULL DEFAULT (1),
      "emailNotifications" integer NOT NULL DEFAULT (1),
      "language" varchar NOT NULL DEFAULT ('en'),
      "timezone" varchar NOT NULL DEFAULT ('UTC'),
      "preferences" text,
      "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
      "updatedAt" datetime NOT NULL DEFAULT (datetime('now'))
    )
  `
  ).run();

  db.prepare(
    `
    INSERT INTO "settings" SELECT 
      "_id", "userId", "theme",
      CASE WHEN "notifications" IN ('1', 'true', '1.0') OR "notifications" = 1 THEN 1 ELSE 0 END,
      CASE WHEN "emailNotifications" IN ('1', 'true', '1.0') OR "emailNotifications" = 1 THEN 1 ELSE 0 END,
      "language", "timezone", "preferences", "createdAt", "updatedAt"
    FROM "${tableName}_backup"
  `
  ).run();

  // Add systemUsage column if it exists in backup
  const backupInfo = db.prepare(`PRAGMA table_info("${tableName}_backup")`).all() as Array<{
    name: string;
  }>;
  if (backupInfo.some(col => col.name === "systemUsage")) {
    db.prepare(`ALTER TABLE "${tableName}" ADD COLUMN "systemUsage" varchar`).run();
    db.prepare(
      `UPDATE "${tableName}" SET "systemUsage" = (SELECT "systemUsage" FROM "${tableName}_backup" WHERE "${tableName}"."_id" = "${tableName}_backup"."_id")`
    ).run();
  }

  db.prepare(`DROP TABLE "${tableName}_backup"`).run();
  console.log(`[Schema Check] ✅ Fixed ${tableName} boolean columns`);
}

/**
 * Fix channels table columns
 */
async function fixChannelsColumns(db: Database.Database): Promise<void> {
  // Get column info before renaming
  const channelCols = db.prepare(`PRAGMA table_info("channels")`).all() as Array<{ name: string }>;
  const channelColNames = channelCols.map(c => c.name);
  const hasCol = (name: string) => channelColNames.includes(name);

  db.prepare(`ALTER TABLE "channels" RENAME TO "channels_backup"`).run();

  db.prepare(
    `
    CREATE TABLE "channels" (
      "_id" varchar PRIMARY KEY NOT NULL,
      "userId" varchar NOT NULL,
      ${hasCol("profileId") ? '"profileId" varchar,' : ""}
      "name" varchar NOT NULL,
      ${hasCol("description") ? '"description" varchar,' : ""}
      ${hasCol("tagline") ? '"tagline" varchar,' : ""}
      ${hasCol("youtubeName") ? '"youtubeName" varchar,' : ""}
      ${hasCol("customUrl") ? '"customUrl" varchar,' : ""}
      ${hasCol("youtubeChannelId") ? '"youtubeChannelId" varchar,' : ""}
      ${hasCol("youtubeChannelUrl") ? '"youtubeChannelUrl" varchar,' : ""}
      ${hasCol("youtubeChannelTitle") ? '"youtubeChannelTitle" varchar,' : ""}
      ${hasCol("youtubeChannelDescription") ? '"youtubeChannelDescription" varchar,' : ""}
      ${hasCol("youtubeChannelThumbnail") ? '"youtubeChannelThumbnail" varchar,' : ""}
      ${hasCol("youtubeChannelBanner") ? '"youtubeChannelBanner" varchar,' : ""}
      "subscriberCount" integer NOT NULL DEFAULT (0),
      "videoCount" integer NOT NULL DEFAULT (0),
      "viewCount" integer NOT NULL DEFAULT (0),
      "isConnected" integer NOT NULL DEFAULT (0),
      ${hasCol("accessToken") ? '"accessToken" text,' : ""}
      ${hasCol("refreshToken") ? '"refreshToken" text,' : ""}
      ${hasCol("tokenExpiresAt") ? '"tokenExpiresAt" datetime,' : ""}
      "defaultPrivacyStatus" varchar NOT NULL DEFAULT ('unlisted'),
      "defaultMadeForKids" integer NOT NULL DEFAULT (0),
      "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
      "updatedAt" datetime NOT NULL DEFAULT (datetime('now')),
      ${hasCol("descriptionFooter") ? '"descriptionFooter" text' : ""}
    )
  `
  ).run();

  const selectCols = [
    '"_id"',
    '"userId"',
    hasCol("profileId") ? '"profileId"' : "NULL",
    '"name"',
    hasCol("description") ? '"description"' : "NULL",
    hasCol("tagline") ? '"tagline"' : "NULL",
    hasCol("youtubeName") ? '"youtubeName"' : "NULL",
    hasCol("customUrl") ? '"customUrl"' : "NULL",
    hasCol("youtubeChannelId") ? '"youtubeChannelId"' : "NULL",
    hasCol("youtubeChannelUrl") ? '"youtubeChannelUrl"' : "NULL",
    hasCol("youtubeChannelTitle") ? '"youtubeChannelTitle"' : "NULL",
    hasCol("youtubeChannelDescription") ? '"youtubeChannelDescription"' : "NULL",
    hasCol("youtubeChannelThumbnail") ? '"youtubeChannelThumbnail"' : "NULL",
    hasCol("youtubeChannelBanner") ? '"youtubeChannelBanner"' : "NULL",
    `CAST(COALESCE("subscriberCount", '0') AS INTEGER)`,
    `CAST(COALESCE("videoCount", '0') AS INTEGER)`,
    `CAST(COALESCE("viewCount", '0') AS INTEGER)`,
    `CASE WHEN "isConnected" IN ('1', 'true', '1.0') OR "isConnected" = 1 THEN 1 ELSE 0 END`,
    hasCol("accessToken") ? '"accessToken"' : "NULL",
    hasCol("refreshToken") ? '"refreshToken"' : "NULL",
    hasCol("tokenExpiresAt") ? '"tokenExpiresAt"' : "NULL",
    '"defaultPrivacyStatus"',
    `CASE WHEN "defaultMadeForKids" IN ('1', 'true', '1.0') OR "defaultMadeForKids" = 1 THEN 1 ELSE 0 END`,
    '"createdAt"',
    '"updatedAt"',
    hasCol("descriptionFooter") ? '"descriptionFooter"' : "NULL",
  ]
    .filter(Boolean)
    .join(", ");

  db.prepare(`INSERT INTO "channels" SELECT ${selectCols} FROM "channels_backup"`).run();
  db.prepare(`DROP TABLE "channels_backup"`).run();
  console.log("[Schema Check] ✅ Fixed channels columns");
}

/**
 * Fix api_keys.isActive column
 */
async function fixApiKeysIsActive(db: Database.Database): Promise<void> {
  db.prepare(
    `
    CREATE TABLE "api_keys_new" (
      "_id" varchar PRIMARY KEY NOT NULL,
      "userId" varchar NOT NULL,
      "service" varchar NOT NULL,
      "apiKey" varchar,
      "apiSecret" varchar,
      "apiUrl" varchar,
      "model" varchar,
      "isActive" integer NOT NULL DEFAULT (1),
      "config" text,
      "lastUsedAt" datetime,
      "usageCount" varchar,
      "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
      "updatedAt" datetime NOT NULL DEFAULT (datetime('now'))
    )
  `
  ).run();

  db.prepare(
    `
    INSERT INTO "api_keys_new" 
    SELECT 
      "_id",
      "userId",
      "service",
      "apiKey",
      "apiSecret",
      "apiUrl",
      "model",
      CASE 
        WHEN "isActive" = '1' OR "isActive" = 1 OR "isActive" = 'true' OR "isActive" = '1.0' THEN 1
        WHEN "isActive" = '0' OR "isActive" = 0 OR "isActive" = 'false' OR "isActive" = '0.0' THEN 0
        ELSE 1
      END as "isActive",
      "config",
      "lastUsedAt",
      "usageCount",
      "createdAt",
      "updatedAt"
    FROM "api_keys"
  `
  ).run();

  db.prepare(`DROP TABLE "api_keys"`).run();
  db.prepare(`ALTER TABLE "api_keys_new" RENAME TO "api_keys"`).run();
  db.prepare(
    `CREATE UNIQUE INDEX "IDX_api_keys_userId_service" ON "api_keys" ("userId", "service")`
  ).run();
  console.log("[Schema Check] ✅ Fixed api_keys.isActive");
}

// Only run if called directly
if (require.main === module) {
  checkAndFixSchema()
    .then(() => {
      console.log("[Schema Check] ✅ Schema check completed");
      process.exit(0);
    })
    .catch(error => {
      console.error("[Schema Check] ❌ Schema check failed:", error);
      process.exit(1);
    });
}
