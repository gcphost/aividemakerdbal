import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEmbeddingsColumnsToProfile1764700000000 implements MigrationInterface {
  name = 'AddEmbeddingsColumnsToProfile1764700000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('➕ Adding embeddings columns to profiles table...');

    // Check existing columns
    const tableInfo = await queryRunner.query(`
      PRAGMA table_info(profiles)
    `);
    const columnNames = tableInfo.map((col: any) => col.name);

    // Add embeddingsProvider if it doesn't exist
    if (!columnNames.includes('embeddingsProvider')) {
      await queryRunner.query(`
        ALTER TABLE profiles
        ADD COLUMN "embeddingsProvider" varchar DEFAULT 'openai'
      `);
      console.log('✅ Added embeddingsProvider column');
    } else {
      console.log('ℹ️  embeddingsProvider column already exists');
    }

    // Add embeddingsModel if it doesn't exist
    if (!columnNames.includes('embeddingsModel')) {
      await queryRunner.query(`
        ALTER TABLE profiles
        ADD COLUMN "embeddingsModel" varchar DEFAULT 'text-embedding-3-small'
      `);
      console.log('✅ Added embeddingsModel column');
    } else {
      console.log('ℹ️  embeddingsModel column already exists');
    }

    console.log('✅ All embeddings columns added to profiles table successfully');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log('⚠️  Reverting: Removing embeddings columns from profiles table...');
    // SQLite doesn't support DROP COLUMN directly, so we'll skip the down migration
    // In production, you'd need to recreate the table
    console.log('⚠️  SQLite does not support DROP COLUMN. Manual table recreation required if needed.');
  }
}

