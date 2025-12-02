"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
async function checkUsageData() {
    try {
        const dataSource = (0, data_source_1.getAppDataSource)();
        if (!dataSource.isInitialized) {
            await dataSource.initialize();
        }
        // Check table schema
        console.log('\n📊 Checking usage table schema...\n');
        const schemaQuery = `
      SELECT sql FROM sqlite_master 
      WHERE type='table' AND name='usage'
    `;
        const schemaResult = await dataSource.query(schemaQuery);
        if (schemaResult.length > 0) {
            console.log('Table schema:');
            console.log(schemaResult[0].sql);
            console.log('\n');
        }
        // Check column types using PRAGMA
        console.log('📋 Column types:');
        const pragmaResult = await dataSource.query('PRAGMA table_info(usage)');
        const numericColumns = ['tokens', 'characters', 'images', 'duration', 'inputTokens', 'outputTokens', 'durationMs', 'fileSize'];
        pragmaResult.forEach((col) => {
            if (numericColumns.includes(col.name)) {
                console.log(`  ${col.name}: ${col.type} ${col.notnull ? 'NOT NULL' : 'NULL'}`);
            }
        });
        console.log('\n');
        // Get sample records
        console.log('📝 Sample records (first 5):\n');
        const sampleRecords = await dataSource.query(`
      SELECT 
        _id,
        userId,
        serviceType,
        tokens,
        characters,
        images,
        duration,
        typeof(tokens) as tokens_type,
        typeof(characters) as characters_type,
        typeof(images) as images_type,
        typeof(duration) as duration_type
      FROM usage
      LIMIT 5
    `);
        if (sampleRecords.length === 0) {
            console.log('  No records found in usage table.\n');
        }
        else {
            sampleRecords.forEach((record, index) => {
                console.log(`Record ${index + 1}:`);
                console.log(`  ID: ${record._id}`);
                console.log(`  User: ${record.userId}`);
                console.log(`  Service: ${record.serviceType}`);
                console.log(`  Tokens: ${record.tokens} (type: ${record.tokens_type})`);
                console.log(`  Characters: ${record.characters} (type: ${record.characters_type})`);
                console.log(`  Images: ${record.images} (type: ${record.images_type})`);
                console.log(`  Duration: ${record.duration} (type: ${record.duration_type})`);
                console.log('');
            });
        }
        // Check for invalid data (non-numeric values in numeric columns)
        console.log('🔍 Checking for invalid data...\n');
        const invalidTokens = await dataSource.query(`
      SELECT COUNT(*) as count 
      FROM usage 
      WHERE tokens IS NOT NULL 
      AND typeof(tokens) != 'integer' 
      AND typeof(tokens) != 'real'
    `);
        console.log(`  Invalid tokens (non-numeric): ${invalidTokens[0].count}`);
        const invalidCharacters = await dataSource.query(`
      SELECT COUNT(*) as count 
      FROM usage 
      WHERE characters IS NOT NULL 
      AND typeof(characters) != 'integer' 
      AND typeof(characters) != 'real'
    `);
        console.log(`  Invalid characters (non-numeric): ${invalidCharacters[0].count}`);
        const invalidImages = await dataSource.query(`
      SELECT COUNT(*) as count 
      FROM usage 
      WHERE images IS NOT NULL 
      AND typeof(images) != 'integer' 
      AND typeof(images) != 'real'
    `);
        console.log(`  Invalid images (non-numeric): ${invalidImages[0].count}`);
        // Get total counts
        const totalRecords = await dataSource.query(`SELECT COUNT(*) as count FROM usage`);
        console.log(`\n  Total records: ${totalRecords[0].count}`);
        // Check migration status
        console.log('\n🔄 Checking migration status...\n');
        const migrations = await dataSource.query(`
      SELECT name FROM sqlite_master 
      WHERE type='table' AND name='migrations'
    `);
        if (migrations.length > 0) {
            const migrationRecords = await dataSource.query(`
        SELECT * FROM migrations ORDER BY timestamp DESC LIMIT 5
      `);
            console.log('Recent migrations:');
            migrationRecords.forEach((m) => {
                console.log(`  ${m.name} (${new Date(m.timestamp).toISOString()})`);
            });
        }
        else {
            console.log('  Migrations table not found (migrations may not have run yet)');
        }
        // Test aggregation to see if calculations work
        console.log('\n🧮 Testing aggregation calculations...\n');
        const testAggregation = await dataSource.query(`
      SELECT 
        SUM(CAST(tokens AS INTEGER)) as total_tokens,
        SUM(CAST(characters AS INTEGER)) as total_characters,
        SUM(CAST(images AS INTEGER)) as total_images,
        SUM(CAST(duration AS REAL)) as total_duration
      FROM usage
      WHERE tokens IS NOT NULL OR characters IS NOT NULL OR images IS NOT NULL OR duration IS NOT NULL
    `);
        console.log('Aggregation results:');
        console.log(`  Total tokens: ${testAggregation[0].total_tokens || 0}`);
        console.log(`  Total characters: ${testAggregation[0].total_characters || 0}`);
        console.log(`  Total images: ${testAggregation[0].total_images || 0}`);
        console.log(`  Total duration: ${testAggregation[0].total_duration || 0}`);
        await dataSource.destroy();
        console.log('\n✅ Database check complete!\n');
    }
    catch (error) {
        console.error('❌ Error checking database:', error);
        process.exit(1);
    }
}
checkUsageData();
//# sourceMappingURL=check-usage-data.js.map