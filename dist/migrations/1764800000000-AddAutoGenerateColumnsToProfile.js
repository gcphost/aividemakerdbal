"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddAutoGenerateColumnsToProfile1764800000000 = void 0;
class AddAutoGenerateColumnsToProfile1764800000000 {
    name = 'AddAutoGenerateColumnsToProfile1764800000000';
    async up(queryRunner) {
        // Add autoGenerateImages column if it doesn't exist
        const profileTable = await queryRunner.getTable('profiles');
        const hasAutoGenerateImages = profileTable?.columns.find(column => column.name === 'autoGenerateImages');
        if (!hasAutoGenerateImages) {
            await queryRunner.query(`ALTER TABLE "profiles" ADD COLUMN "autoGenerateImages" integer`);
            console.log('[Migration] Added autoGenerateImages column to profiles table');
        }
        // Add disableMusicGeneration column if it doesn't exist  
        const hasDisableMusicGeneration = profileTable?.columns.find(column => column.name === 'disableMusicGeneration');
        if (!hasDisableMusicGeneration) {
            await queryRunner.query(`ALTER TABLE "profiles" ADD COLUMN "disableMusicGeneration" integer`);
            console.log('[Migration] Added disableMusicGeneration column to profiles table');
        }
        // Add disableSoundGeneration column if it doesn't exist
        const hasDisableSoundGeneration = profileTable?.columns.find(column => column.name === 'disableSoundGeneration');
        if (!hasDisableSoundGeneration) {
            await queryRunner.query(`ALTER TABLE "profiles" ADD COLUMN "disableSoundGeneration" integer`);
            console.log('[Migration] Added disableSoundGeneration column to profiles table');
        }
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "profiles" DROP COLUMN "disableSoundGeneration"`);
        await queryRunner.query(`ALTER TABLE "profiles" DROP COLUMN "disableMusicGeneration"`);
        await queryRunner.query(`ALTER TABLE "profiles" DROP COLUMN "autoGenerateImages"`);
    }
}
exports.AddAutoGenerateColumnsToProfile1764800000000 = AddAutoGenerateColumnsToProfile1764800000000;
//# sourceMappingURL=1764800000000-AddAutoGenerateColumnsToProfile.js.map