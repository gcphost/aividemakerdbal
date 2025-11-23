"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddWaveformPeaksToBackgroundAudio1764000000000 = void 0;
class AddWaveformPeaksToBackgroundAudio1764000000000 {
    name = 'AddWaveformPeaksToBackgroundAudio1764000000000';
    async up(queryRunner) {
        // SQLite supports ALTER TABLE ADD COLUMN for nullable columns
        await queryRunner.query(`
      ALTER TABLE "background_audio" 
      ADD COLUMN "waveformPeaks" text
    `);
    }
    async down(queryRunner) {
        // SQLite doesn't support DROP COLUMN directly, so we need to recreate the table
        // Step 1: Create new table without waveformPeaks
        await queryRunner.query(`
      CREATE TABLE "background_audio_new" (
        "_id" varchar PRIMARY KEY NOT NULL,
        "userId" varchar NOT NULL,
        "name" varchar NOT NULL,
        "title" varchar,
        "description" varchar,
        "genre" varchar,
        "mood" varchar,
        "tempo" varchar,
        "instrumental" varchar NOT NULL DEFAULT ('false'),
        "audioUrl" varchar,
        "audioFileId" varchar,
        "duration" varchar,
        "volume" varchar NOT NULL DEFAULT ('70'),
        "loop" varchar NOT NULL DEFAULT ('false'),
        "searchTerm" varchar,
        "prompt" varchar,
        "status" varchar NOT NULL DEFAULT ('draft'),
        "audioGeneratedAt" datetime,
        "audioGenerationTimeMs" varchar,
        "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
        "updatedAt" datetime NOT NULL DEFAULT (datetime('now'))
      )
    `);
        // Step 2: Copy data from old table (excluding waveformPeaks)
        await queryRunner.query(`
      INSERT INTO "background_audio_new" SELECT 
        "_id", "userId", "name", "title", "description",
        "genre", "mood", "tempo", "instrumental",
        "audioUrl", "audioFileId", "duration", "volume", "loop",
        "searchTerm", "prompt", "status",
        "audioGeneratedAt", "audioGenerationTimeMs",
        "createdAt", "updatedAt"
      FROM "background_audio"
    `);
        // Step 3: Drop old table
        await queryRunner.query(`DROP TABLE "background_audio"`);
        // Step 4: Rename new table
        await queryRunner.query(`ALTER TABLE "background_audio_new" RENAME TO "background_audio"`);
    }
}
exports.AddWaveformPeaksToBackgroundAudio1764000000000 = AddWaveformPeaksToBackgroundAudio1764000000000;
//# sourceMappingURL=1764000000000-AddWaveformPeaksToBackgroundAudio.js.map