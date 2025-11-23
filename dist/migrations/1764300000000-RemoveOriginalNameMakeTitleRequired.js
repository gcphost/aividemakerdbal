"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveOriginalNameMakeTitleRequired1764300000000 = void 0;
class RemoveOriginalNameMakeTitleRequired1764300000000 {
    name = 'RemoveOriginalNameMakeTitleRequired1764300000000';
    async up(queryRunner) {
        console.log('🗑️  Removing originalName column and making title required...');
        // First, ensure all existing records have a title value (set to filename if empty)
        await queryRunner.query(`
      UPDATE files
      SET title = filename
      WHERE title IS NULL OR title = ''
    `);
        // Make title column NOT NULL
        await queryRunner.query(`
      ALTER TABLE files
      ALTER COLUMN title SET NOT NULL
    `);
        // Drop the originalName column
        await queryRunner.query(`
      ALTER TABLE files
      DROP COLUMN "originalName"
    `);
        console.log('✅ originalName column removed and title made required successfully');
    }
    async down(queryRunner) {
        console.log('⚠️  Reverting: Adding back originalName column and making title nullable...');
        // Add back the originalName column
        await queryRunner.query(`
      ALTER TABLE files
      ADD COLUMN "originalName" varchar NOT NULL DEFAULT ''
    `);
        // Set originalName to title for existing records
        await queryRunner.query(`
      UPDATE files
      SET "originalName" = title
      WHERE "originalName" = ''
    `);
        // Make title nullable again
        await queryRunner.query(`
      ALTER TABLE files
      ALTER COLUMN title DROP NOT NULL
    `);
        console.log('✅ Reverted: originalName column restored and title made nullable');
    }
}
exports.RemoveOriginalNameMakeTitleRequired1764300000000 = RemoveOriginalNameMakeTitleRequired1764300000000;
//# sourceMappingURL=1764300000000-RemoveOriginalNameMakeTitleRequired.js.map