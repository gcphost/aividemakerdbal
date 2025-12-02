"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkMissingColumns = checkMissingColumns;
const data_source_1 = require("../data-source");
async function checkMissingColumns() {
    const dataSource = (0, data_source_1.getAppDataSource)();
    if (!dataSource.isInitialized) {
        await dataSource.initialize();
    }
    const queryRunner = dataSource.createQueryRunner();
    const missingColumns = [];
    // Get all entity metadata
    const entityMetadatas = dataSource.entityMetadatas;
    for (const metadata of entityMetadatas) {
        const tableName = metadata.tableName;
        // Get columns from entity
        const entityColumns = metadata.columns.map(col => ({
            name: col.databaseName || col.propertyName,
            type: col.type === 'varchar' ? 'varchar' : col.type === 'text' ? 'text' : col.type === 'integer' ? 'integer' : col.type === 'datetime' ? 'datetime' : 'varchar',
            nullable: col.isNullable
        }));
        // Get columns from database
        const dbColumns = await queryRunner.query(`
      PRAGMA table_info(${tableName})
    `);
        const dbColumnNames = dbColumns.map((col) => col.name);
        // Check for missing columns
        for (const entityCol of entityColumns) {
            if (!dbColumnNames.includes(entityCol.name)) {
                missingColumns.push({
                    table: tableName,
                    column: entityCol.name,
                    type: entityCol.type
                });
                console.log(`❌ Missing: ${tableName}.${entityCol.name} (${entityCol.type})`);
            }
        }
    }
    await queryRunner.release();
    await dataSource.destroy();
    if (missingColumns.length === 0) {
        console.log('✅ All columns are present in the database!');
    }
    else {
        console.log(`\n📋 Found ${missingColumns.length} missing columns:`);
        console.log(JSON.stringify(missingColumns, null, 2));
    }
    return missingColumns;
}
if (require.main === module) {
    checkMissingColumns().catch(console.error);
}
//# sourceMappingURL=check-missing-columns.js.map