"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropBackgroundAudioTable1764200000000 = void 0;
class DropBackgroundAudioTable1764200000000 {
    name = 'DropBackgroundAudioTable1764200000000';
    async up(queryRunner) {
        // WARNING: This migration drops the background_audio table.
        // Make sure all data has been migrated to the files table before running this migration.
        // Run the migration script at shared-db/scripts/migrate-background-audio-to-file.ts first!
        console.log('🗑️  Dropping background_audio table...');
        await queryRunner.query(`DROP TABLE IF EXISTS "background_audio"`);
        console.log('✅ Background audio table dropped successfully');
    }
    async down(queryRunner) {
        // This migration is irreversible. The background_audio table and its data cannot be restored.
        // If you need to rollback, you must restore from a backup that includes the background_audio table.
        console.log('⚠️  This migration is irreversible. The background_audio table has been permanently removed.');
        console.log('   To restore, you must restore from a database backup taken before this migration.');
        throw new Error('This migration cannot be reversed. Restore from backup if needed.');
    }
}
exports.DropBackgroundAudioTable1764200000000 = DropBackgroundAudioTable1764200000000;
//# sourceMappingURL=1764200000000-DropBackgroundAudioTable.js.map