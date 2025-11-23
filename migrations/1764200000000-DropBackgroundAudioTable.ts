import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropBackgroundAudioTable1764200000000 implements MigrationInterface {
  name = 'DropBackgroundAudioTable1764200000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // WARNING: This migration drops the background_audio table.
    // Make sure all data has been migrated to the files table before running this migration.
    // Run the migration script at shared-db/scripts/migrate-background-audio-to-file.ts first!

    console.log('🗑️  Dropping background_audio table...');
    await queryRunner.query(`DROP TABLE IF EXISTS "background_audio"`);
    console.log('✅ Background audio table dropped successfully');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // This migration is irreversible. The background_audio table and its data cannot be restored.
    // If you need to rollback, you must restore from a backup that includes the background_audio table.
    console.log('⚠️  This migration is irreversible. The background_audio table has been permanently removed.');
    console.log('   To restore, you must restore from a database backup taken before this migration.');
    throw new Error('This migration cannot be reversed. Restore from backup if needed.');
  }
}
