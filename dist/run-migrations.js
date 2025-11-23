"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runMigrations = runMigrations;
const data_source_1 = require("./data-source");
async function runMigrations() {
    try {
        console.log('Running TypeORM migrations...');
        const dataSource = (0, data_source_1.getAppDataSource)();
        if (!dataSource.isInitialized) {
            await dataSource.initialize();
            console.log('Database connection established');
        }
        // Run pending migrations
        await dataSource.runMigrations();
        console.log('Migrations completed successfully');
        await dataSource.destroy();
    }
    catch (error) {
        console.error('Error running migrations:', error);
        process.exit(1);
    }
}
// Only run if called directly
if (require.main === module) {
    runMigrations();
}
//# sourceMappingURL=run-migrations.js.map