"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixProfileBooleanColumns1763866227000 = void 0;
class FixProfileBooleanColumns1763866227000 {
    name = 'FixProfileBooleanColumns1763866227000';
    async up(queryRunner) {
        // SQLite doesn't support ALTER COLUMN, so we need to recreate the table
        // Step 1: Create new table with correct schema
        await queryRunner.query(`
      CREATE TABLE "profiles_new" (
        "_id" varchar PRIMARY KEY NOT NULL,
        "userId" varchar NOT NULL,
        "name" varchar NOT NULL,
        "description" varchar,
        "narratorPromptTemplate" varchar,
        "introScriptTemplate" varchar,
        "outroScriptTemplate" varchar,
        "imageStylePrompt" varchar,
        "imageDescriptionPrompt" varchar,
        "soundGenerationPrompt" varchar,
        "musicGenerationPrompt" varchar,
        "chapterGenerationPrompt" varchar,
        "advertisingScriptPrompt" varchar,
        "enableMidstoryCTA" integer NOT NULL DEFAULT (1),
        "chapterTransitionPrompt" varchar,
        "antiAiPrompt" varchar,
        "imageProvider" varchar NOT NULL,
        "ttsProvider" varchar,
        "ttsUseEmotionalTags" integer NOT NULL DEFAULT (0),
        "ttsSettings" text,
        "ttsVoice" varchar,
        "ttsModel" varchar,
        "ttsVoiceInstructions" varchar,
        "ttsElevenLabsVoiceId" varchar,
        "ttsChunkDurationSeconds" integer,
        "thumbnailImageProvider" varchar,
        "imageSettings" text,
        "imagesPerMinute" float,
        "maxImagesPerChapter" integer,
        "kenBurnsZoomDuration" float,
        "chapterDelaySeconds" float,
        "chapterGapDurationSeconds" float,
        "chunkDelaySeconds" float,
        "autoGenerateSounds" integer,
        "autoGenerateMusic" integer,
        "musicProvider" varchar,
        "soundEffectProvider" varchar,
        "disableImageGeneration" integer,
        "channelIntroDurationSeconds" float,
        "channelOutroDurationSeconds" float,
        "wordsPerMinute" float,
        "videoProvider" varchar NOT NULL,
        "videoSettings" text,
        "videoStyle" varchar NOT NULL,
        "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
        "updatedAt" datetime NOT NULL DEFAULT (datetime('now'))
      )
    `);
        // Step 2: Copy data from old table, converting boolean strings to integers
        await queryRunner.query(`
      INSERT INTO "profiles_new" SELECT 
        "_id",
        "userId",
        "name",
        "description",
        "narratorPromptTemplate",
        "introScriptTemplate",
        "outroScriptTemplate",
        "imageStylePrompt",
        "imageDescriptionPrompt",
        "soundGenerationPrompt",
        "musicGenerationPrompt",
        "chapterGenerationPrompt",
        "advertisingScriptPrompt",
        CASE WHEN "enableMidstoryCTA" = 'true' OR "enableMidstoryCTA" = '1' THEN 1 ELSE 0 END as "enableMidstoryCTA",
        "chapterTransitionPrompt",
        "antiAiPrompt",
        COALESCE("imageProvider", 'huggingface') as "imageProvider",
        "ttsProvider",
        CASE WHEN "ttsUseEmotionalTags" = 'true' OR "ttsUseEmotionalTags" = '1' THEN 1 ELSE 0 END as "ttsUseEmotionalTags",
        "ttsSettings",
        "ttsVoice",
        "ttsModel",
        "ttsVoiceInstructions",
        "ttsElevenLabsVoiceId",
        "ttsChunkDurationSeconds",
        "thumbnailImageProvider",
        "imageSettings",
        "imagesPerMinute",
        "maxImagesPerChapter",
        "kenBurnsZoomDuration",
        "chapterDelaySeconds",
        "chapterGapDurationSeconds",
        "chunkDelaySeconds",
        CASE WHEN "autoGenerateSounds" = 'true' OR "autoGenerateSounds" = '1' THEN 1 ELSE 0 END as "autoGenerateSounds",
        CASE WHEN "autoGenerateMusic" = 'true' OR "autoGenerateMusic" = '1' THEN 1 ELSE 0 END as "autoGenerateMusic",
        "musicProvider",
        "soundEffectProvider",
        CASE WHEN "disableImageGeneration" = 'true' OR "disableImageGeneration" = '1' THEN 1 ELSE 0 END as "disableImageGeneration",
        "channelIntroDurationSeconds",
        "channelOutroDurationSeconds",
        "wordsPerMinute",
        COALESCE("videoProvider", 'google-veo') as "videoProvider",
        "videoSettings",
        COALESCE("videoStyle", 'standard') as "videoStyle",
        "createdAt",
        "updatedAt"
      FROM "profiles"
    `);
        // Step 3: Drop old table
        await queryRunner.query(`DROP TABLE "profiles"`);
        // Step 4: Rename new table
        await queryRunner.query(`ALTER TABLE "profiles_new" RENAME TO "profiles"`);
    }
    async down(queryRunner) {
        // Revert back to varchar columns (not recommended, but for rollback)
        await queryRunner.query(`
      CREATE TABLE "profiles_old" (
        "_id" varchar PRIMARY KEY NOT NULL,
        "userId" varchar NOT NULL,
        "name" varchar NOT NULL,
        "description" varchar,
        "narratorPromptTemplate" varchar,
        "introScriptTemplate" varchar,
        "outroScriptTemplate" varchar,
        "imageStylePrompt" varchar,
        "imageDescriptionPrompt" varchar,
        "soundGenerationPrompt" varchar,
        "musicGenerationPrompt" varchar,
        "chapterGenerationPrompt" varchar,
        "advertisingScriptPrompt" varchar,
        "enableMidstoryCTA" varchar NOT NULL DEFAULT ('true'),
        "chapterTransitionPrompt" varchar,
        "antiAiPrompt" varchar,
        "imageProvider" varchar NOT NULL,
        "ttsProvider" varchar,
        "ttsUseEmotionalTags" varchar NOT NULL DEFAULT ('false'),
        "ttsSettings" text,
        "ttsVoice" varchar,
        "ttsModel" varchar,
        "ttsVoiceInstructions" varchar,
        "ttsElevenLabsVoiceId" varchar,
        "ttsChunkDurationSeconds" integer,
        "thumbnailImageProvider" varchar,
        "imageSettings" text,
        "imagesPerMinute" float,
        "maxImagesPerChapter" integer,
        "kenBurnsZoomDuration" float,
        "chapterDelaySeconds" float,
        "chapterGapDurationSeconds" float,
        "chunkDelaySeconds" float,
        "autoGenerateSounds" varchar,
        "autoGenerateMusic" varchar,
        "musicProvider" varchar,
        "soundEffectProvider" varchar,
        "disableImageGeneration" varchar,
        "channelIntroDurationSeconds" float,
        "channelOutroDurationSeconds" float,
        "wordsPerMinute" float,
        "videoProvider" varchar NOT NULL,
        "videoSettings" text,
        "videoStyle" varchar NOT NULL,
        "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
        "updatedAt" datetime NOT NULL DEFAULT (datetime('now'))
      )
    `);
        await queryRunner.query(`
      INSERT INTO "profiles_old" SELECT 
        "_id", "userId", "name", "description",
        "narratorPromptTemplate", "introScriptTemplate", "outroScriptTemplate",
        "imageStylePrompt", "imageDescriptionPrompt",
        "soundGenerationPrompt", "musicGenerationPrompt", "chapterGenerationPrompt",
        "advertisingScriptPrompt",
        CASE WHEN "enableMidstoryCTA" = 1 THEN 'true' ELSE 'false' END as "enableMidstoryCTA",
        "chapterTransitionPrompt", "antiAiPrompt",
        "imageProvider", "ttsProvider",
        CASE WHEN "ttsUseEmotionalTags" = 1 THEN 'true' ELSE 'false' END as "ttsUseEmotionalTags",
        "ttsSettings", "ttsVoice", "ttsModel", "ttsVoiceInstructions", "ttsElevenLabsVoiceId",
        "ttsChunkDurationSeconds", "thumbnailImageProvider", "imageSettings",
        "imagesPerMinute", "maxImagesPerChapter", "kenBurnsZoomDuration",
        "chapterDelaySeconds", "chapterGapDurationSeconds", "chunkDelaySeconds",
        CASE WHEN "autoGenerateSounds" = 1 THEN 'true' ELSE 'false' END as "autoGenerateSounds",
        CASE WHEN "autoGenerateMusic" = 1 THEN 'true' ELSE 'false' END as "autoGenerateMusic",
        "musicProvider", "soundEffectProvider",
        CASE WHEN "disableImageGeneration" = 1 THEN 'true' ELSE 'false' END as "disableImageGeneration",
        "channelIntroDurationSeconds", "channelOutroDurationSeconds", "wordsPerMinute",
        "videoProvider", "videoSettings", "videoStyle",
        "createdAt", "updatedAt"
      FROM "profiles"
    `);
        await queryRunner.query(`DROP TABLE "profiles"`);
        await queryRunner.query(`ALTER TABLE "profiles_old" RENAME TO "profiles"`);
    }
}
exports.FixProfileBooleanColumns1763866227000 = FixProfileBooleanColumns1763866227000;
//# sourceMappingURL=1763866227000-FixProfileBooleanColumns.js.map