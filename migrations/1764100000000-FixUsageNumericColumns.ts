import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixUsageNumericColumns1764100000000 implements MigrationInterface {
  name = 'FixUsageNumericColumns1764100000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // SQLite doesn't support ALTER COLUMN, so we need to recreate the table
    // Step 1: Create new table with correct schema
    await queryRunner.query(`
      CREATE TABLE "usage_new" (
        "_id" varchar PRIMARY KEY NOT NULL,
        "userId" varchar NOT NULL,
        "date" date NOT NULL,
        "videoId" varchar,
        "chapterId" varchar,
        "service" varchar NOT NULL,
        "action" varchar NOT NULL,
        "serviceType" varchar,
        "provider" varchar,
        "operation" varchar,
        "model" varchar,
        "tokens" integer,
        "characters" integer,
        "images" integer,
        "duration" real,
        "cost" decimal(10,4) NOT NULL DEFAULT (0),
        "currency" varchar NOT NULL DEFAULT ('USD'),
        "metadata" text,
        "inputTokens" integer,
        "outputTokens" integer,
        "durationMs" integer,
        "fileSize" integer,
        "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
        "updatedAt" datetime NOT NULL DEFAULT (datetime('now'))
      )
    `);

    // Step 2: Copy data from old table, converting varchar strings to numbers
    await queryRunner.query(`
      INSERT INTO "usage_new" SELECT 
        "_id",
        "userId",
        "date",
        "videoId",
        "chapterId",
        "service",
        "action",
        "serviceType",
        "provider",
        "operation",
        "model",
        CASE 
          WHEN "tokens" IS NULL OR "tokens" = '' THEN NULL 
          ELSE CAST("tokens" AS integer) 
        END as "tokens",
        CASE 
          WHEN "characters" IS NULL OR "characters" = '' THEN NULL 
          ELSE CAST("characters" AS integer) 
        END as "characters",
        CASE 
          WHEN "images" IS NULL OR "images" = '' THEN NULL 
          ELSE CAST("images" AS integer) 
        END as "images",
        CASE 
          WHEN "duration" IS NULL OR "duration" = '' THEN NULL 
          ELSE CAST("duration" AS real) 
        END as "duration",
        "cost",
        COALESCE("currency", 'USD') as "currency",
        "metadata",
        CASE 
          WHEN "inputTokens" IS NULL OR "inputTokens" = '' THEN NULL 
          ELSE CAST("inputTokens" AS integer) 
        END as "inputTokens",
        CASE 
          WHEN "outputTokens" IS NULL OR "outputTokens" = '' THEN NULL 
          ELSE CAST("outputTokens" AS integer) 
        END as "outputTokens",
        CASE 
          WHEN "durationMs" IS NULL OR "durationMs" = '' THEN NULL 
          ELSE CAST("durationMs" AS integer) 
        END as "durationMs",
        CASE 
          WHEN "fileSize" IS NULL OR "fileSize" = '' THEN NULL 
          ELSE CAST("fileSize" AS integer) 
        END as "fileSize",
        "createdAt",
        "updatedAt"
      FROM "usage"
    `);

    // Step 3: Drop old table
    await queryRunner.query(`DROP TABLE "usage"`);

    // Step 4: Rename new table
    await queryRunner.query(`ALTER TABLE "usage_new" RENAME TO "usage"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revert back to varchar columns (not recommended, but for rollback)
    await queryRunner.query(`
      CREATE TABLE "usage_old" (
        "_id" varchar PRIMARY KEY NOT NULL,
        "userId" varchar NOT NULL,
        "date" date NOT NULL,
        "videoId" varchar,
        "chapterId" varchar,
        "service" varchar NOT NULL,
        "action" varchar NOT NULL,
        "serviceType" varchar,
        "provider" varchar,
        "operation" varchar,
        "model" varchar,
        "tokens" varchar,
        "characters" varchar,
        "images" varchar,
        "duration" varchar,
        "cost" decimal(10,4) NOT NULL DEFAULT (0),
        "currency" varchar NOT NULL DEFAULT ('USD'),
        "metadata" text,
        "inputTokens" varchar,
        "outputTokens" varchar,
        "durationMs" varchar,
        "fileSize" varchar,
        "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
        "updatedAt" datetime NOT NULL DEFAULT (datetime('now'))
      )
    `);

    await queryRunner.query(`
      INSERT INTO "usage_old" SELECT 
        "_id", "userId", "date", "videoId", "chapterId",
        "service", "action", "serviceType", "provider", "operation", "model",
        CAST("tokens" AS text) as "tokens",
        CAST("characters" AS text) as "characters",
        CAST("images" AS text) as "images",
        CAST("duration" AS text) as "duration",
        "cost", "currency", "metadata",
        CAST("inputTokens" AS text) as "inputTokens",
        CAST("outputTokens" AS text) as "outputTokens",
        CAST("durationMs" AS text) as "durationMs",
        CAST("fileSize" AS text) as "fileSize",
        "createdAt", "updatedAt"
      FROM "usage"
    `);

    await queryRunner.query(`DROP TABLE "usage"`);
    await queryRunner.query(`ALTER TABLE "usage_old" RENAME TO "usage"`);
  }
}

