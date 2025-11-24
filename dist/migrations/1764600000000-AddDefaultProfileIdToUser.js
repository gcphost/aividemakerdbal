"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddDefaultProfileIdToUser1764600000000 = void 0;
class AddDefaultProfileIdToUser1764600000000 {
    name = 'AddDefaultProfileIdToUser1764600000000';
    async up(queryRunner) {
        console.log('➕ Adding defaultProfileId column to users table...');
        // Check existing columns
        const tableInfo = await queryRunner.query(`
      PRAGMA table_info(users)
    `);
        const columnNames = tableInfo.map((col) => col.name);
        // Add defaultProfileId if it doesn't exist
        if (!columnNames.includes('defaultProfileId')) {
            await queryRunner.query(`
        ALTER TABLE users
        ADD COLUMN "defaultProfileId" varchar
      `);
            console.log('✅ Added defaultProfileId column');
        }
        else {
            console.log('ℹ️  defaultProfileId column already exists');
        }
        console.log('✅ defaultProfileId column added to users table successfully');
    }
    async down(queryRunner) {
        console.log('⚠️  Reverting: Removing defaultProfileId column from users table...');
        // SQLite doesn't support DROP COLUMN directly, so we'll skip the down migration
        // In production, you'd need to recreate the table
        console.log('⚠️  SQLite does not support DROP COLUMN. Manual table recreation required if needed.');
    }
}
exports.AddDefaultProfileIdToUser1764600000000 = AddDefaultProfileIdToUser1764600000000;
//# sourceMappingURL=1764600000000-AddDefaultProfileIdToUser.js.map