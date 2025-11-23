"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialSchema1736854000000 = void 0;
class InitialSchema1736854000000 {
    name = 'InitialSchema1736854000000';
    async up(queryRunner) {
        // Since we're using synchronize: false in production, we need to create tables manually
        // For now, we'll use synchronize in the data-source for initial setup
        // This migration is a placeholder - the actual schema is managed by entities
    }
    async down(queryRunner) {
        // Drop tables in reverse order to handle foreign keys
        await queryRunner.query(`DROP TABLE IF EXISTS performance_metrics`);
        await queryRunner.query(`DROP TABLE IF EXISTS usage`);
        await queryRunner.query(`DROP TABLE IF EXISTS process_estimates`);
        await queryRunner.query(`DROP TABLE IF EXISTS processes`);
        await queryRunner.query(`DROP TABLE IF EXISTS files`);
        await queryRunner.query(`DROP TABLE IF EXISTS background_audio`);
        await queryRunner.query(`DROP TABLE IF EXISTS api_keys`);
        await queryRunner.query(`DROP TABLE IF EXISTS settings`);
        await queryRunner.query(`DROP TABLE IF EXISTS chapters`);
        await queryRunner.query(`DROP TABLE IF EXISTS videos`);
        await queryRunner.query(`DROP TABLE IF EXISTS channels`);
        await queryRunner.query(`DROP TABLE IF EXISTS profiles`);
        await queryRunner.query(`DROP TABLE IF EXISTS users`);
    }
}
exports.InitialSchema1736854000000 = InitialSchema1736854000000;
//# sourceMappingURL=1736854000000-InitialSchema.js.map