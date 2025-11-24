import { MigrationInterface, QueryRunner } from 'typeorm';

export class EnhanceUsageTable1764100900000 implements MigrationInterface {
  name = 'EnhanceUsageTable1764100900000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add new columns to track prompt, response, and generated file
    await queryRunner.query(`
      ALTER TABLE "usage" ADD COLUMN "prompt" text NULL
    `);

    await queryRunner.query(`
      ALTER TABLE "usage" ADD COLUMN "response" text NULL
    `);

    await queryRunner.query(`
      ALTER TABLE "usage" ADD COLUMN "fileId" varchar NULL
    `);

    // Remove chapterId column as it's now tracked in metadata
    await queryRunner.query(`
      CREATE TABLE "usage_new" (
        "_id" varchar PRIMARY KEY NOT NULL,
        "userId" varchar NOT NULL,
        "date" date NOT NULL,
        "videoId" varchar,
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
        "prompt" text,
        "response" text,
        "fileId" varchar,
        "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
        "updatedAt" datetime NOT NULL DEFAULT (datetime('now'))
      )
    `);

    // Copy data from old table to new table (without chapterId)
    await queryRunner.query(`
      INSERT INTO "usage_new" (
        "_id", "userId", "date", "videoId", "service", "action", "serviceType", 
        "provider", "operation", "model", "tokens", "characters", "images", "duration", 
        "cost", "currency", "metadata", "inputTokens", "outputTokens", "durationMs", 
        "fileSize", "prompt", "response", "fileId", "createdAt", "updatedAt"
      )
      SELECT 
        "_id", "userId", "date", "videoId", "service", "action", "serviceType", 
        "provider", "operation", "model", "tokens", "characters", "images", "duration", 
        "cost", "currency", "metadata", "inputTokens", "outputTokens", "durationMs", 
        "fileSize", NULL, NULL, NULL, "createdAt", "updatedAt"
      FROM "usage"
    `);

    // Drop old table
    await queryRunner.query(`DROP TABLE "usage"`);

    // Rename new table to original name
    await queryRunner.query(`ALTER TABLE "usage_new" RENAME TO "usage"`);

    // Recreate the foreign key
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "temp_fk_check" (test int);
      DROP TABLE "temp_fk_check"
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Recreate the old table structure
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

    // Copy data back (chapterId will be NULL)
    await queryRunner.query(`
      INSERT INTO "usage_old" (
        "_id", "userId", "date", "videoId", "chapterId", "service", "action", "serviceType", 
        "provider", "operation", "model", "tokens", "characters", "images", "duration", 
        "cost", "currency", "metadata", "inputTokens", "outputTokens", "durationMs", 
        "fileSize", "createdAt", "updatedAt"
      )
      SELECT 
        "_id", "userId", "date", "videoId", NULL, "service", "action", "serviceType", 
        "provider", "operation", "model", "tokens", "characters", "images", "duration", 
        "cost", "currency", "metadata", "inputTokens", "outputTokens", "durationMs", 
        "fileSize", "createdAt", "updatedAt"
      FROM "usage"
    `);

    // Drop new table
    await queryRunner.query(`DROP TABLE "usage"`);

    // Rename old table back to original name
    await queryRunner.query(`ALTER TABLE "usage_old" RENAME TO "usage"`);
  }
}

