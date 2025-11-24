import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddModelEstimateFieldsToProcessEstimate1764500000000 implements MigrationInterface {
  name = 'AddModelEstimateFieldsToProcessEstimate1764500000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('➕ Adding model-level estimate fields to process_estimates table...');

    // Check existing columns
    const tableInfo = await queryRunner.query(`
      PRAGMA table_info(process_estimates)
    `);
    const columnNames = tableInfo.map((col: any) => col.name);

    // Add serviceType if it doesn't exist
    if (!columnNames.includes('serviceType')) {
      await queryRunner.query(`
        ALTER TABLE process_estimates
        ADD COLUMN "serviceType" varchar
      `);
      console.log('✅ Added serviceType column');
    } else {
      console.log('ℹ️  serviceType column already exists');
    }

    // Add provider if it doesn't exist
    if (!columnNames.includes('provider')) {
      await queryRunner.query(`
        ALTER TABLE process_estimates
        ADD COLUMN "provider" varchar
      `);
      console.log('✅ Added provider column');
    } else {
      console.log('ℹ️  provider column already exists');
    }

    // Add model if it doesn't exist
    if (!columnNames.includes('model')) {
      await queryRunner.query(`
        ALTER TABLE process_estimates
        ADD COLUMN "model" varchar
      `);
      console.log('✅ Added model column');
    } else {
      console.log('ℹ️  model column already exists');
    }

    // Add operation if it doesn't exist
    if (!columnNames.includes('operation')) {
      await queryRunner.query(`
        ALTER TABLE process_estimates
        ADD COLUMN "operation" varchar
      `);
      console.log('✅ Added operation column');
    } else {
      console.log('ℹ️  operation column already exists');
    }

    // Add timePerUnit if it doesn't exist
    if (!columnNames.includes('timePerUnit')) {
      await queryRunner.query(`
        ALTER TABLE process_estimates
        ADD COLUMN "timePerUnit" decimal(10,2)
      `);
      console.log('✅ Added timePerUnit column');
    } else {
      console.log('ℹ️  timePerUnit column already exists');
    }

    // Add unitType if it doesn't exist
    if (!columnNames.includes('unitType')) {
      await queryRunner.query(`
        ALTER TABLE process_estimates
        ADD COLUMN "unitType" varchar
      `);
      console.log('✅ Added unitType column');
    } else {
      console.log('ℹ️  unitType column already exists');
    }

    // Add sampleCount if it doesn't exist
    if (!columnNames.includes('sampleCount')) {
      await queryRunner.query(`
        ALTER TABLE process_estimates
        ADD COLUMN "sampleCount" integer
      `);
      console.log('✅ Added sampleCount column');
    } else {
      console.log('ℹ️  sampleCount column already exists');
    }

    // Add lastCalculated if it doesn't exist
    if (!columnNames.includes('lastCalculated')) {
      await queryRunner.query(`
        ALTER TABLE process_estimates
        ADD COLUMN "lastCalculated" datetime
      `);
      console.log('✅ Added lastCalculated column');
    } else {
      console.log('ℹ️  lastCalculated column already exists');
    }

    console.log('✅ All model-level estimate fields added to process_estimates table successfully');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log('⚠️  Reverting: Removing model-level estimate fields from process_estimates table...');
    // SQLite doesn't support DROP COLUMN directly, so we'll skip the down migration
    // In production, you'd need to recreate the table
    console.log('⚠️  SQLite does not support DROP COLUMN. Manual table recreation required if needed.');
  }
}

