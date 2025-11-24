import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTaglineToChannels1764400000000 implements MigrationInterface {
  name = 'AddTaglineToChannels1764400000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('➕ Adding missing columns to channels table...');

    // Check and add tagline if it doesn't exist
    const taglineInfo = await queryRunner.query(`
      PRAGMA table_info(channels)
    `);
    const hasTagline = taglineInfo.some((col: any) => col.name === 'tagline');
    if (!hasTagline) {
      await queryRunner.query(`
        ALTER TABLE channels
        ADD COLUMN "tagline" varchar
      `);
      console.log('✅ Added tagline column');
    } else {
      console.log('ℹ️  tagline column already exists');
    }

    // Check and add youtubeName if it doesn't exist
    const hasYoutubeName = taglineInfo.some((col: any) => col.name === 'youtubeName');
    if (!hasYoutubeName) {
      await queryRunner.query(`
        ALTER TABLE channels
        ADD COLUMN "youtubeName" varchar
      `);
      console.log('✅ Added youtubeName column');
    } else {
      console.log('ℹ️  youtubeName column already exists');
    }

    console.log('✅ All missing columns added to channels table successfully');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log('⚠️  Reverting: Removing columns from channels table...');

    // SQLite doesn't support DROP COLUMN directly, so we'll skip the down migration
    // In production, you'd need to recreate the table
    console.log('⚠️  SQLite does not support DROP COLUMN. Manual table recreation required if needed.');
  }
}

