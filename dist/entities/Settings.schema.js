"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = exports.SettingsSchema = void 0;
const typeorm_1 = require("typeorm");
exports.SettingsSchema = new typeorm_1.EntitySchema({
    name: 'Settings',
    tableName: 'settings',
    // NO target - plain class, doesn't extend BaseEntity to avoid metadata initialization
    columns: {
        _id: {
            type: 'varchar',
            primary: true,
        },
        userId: {
            type: 'varchar',
        },
        theme: {
            type: 'varchar',
            nullable: true,
        },
        notifications: {
            type: 'varchar',
            default: true,
        },
        emailNotifications: {
            type: 'varchar',
            default: true,
        },
        language: {
            type: 'varchar',
            default: 'en',
        },
        timezone: {
            type: 'varchar',
            default: 'UTC',
        },
        preferences: {
            type: 'text',
            nullable: true,
        },
        createdAt: {
            type: 'datetime',
            createDate: true,
        },
        updatedAt: {
            type: 'datetime',
            updateDate: true,
        },
    },
});
// Export a plain class - NO extends BaseEntity to avoid TypeORM metadata initialization
// BaseEntity methods are available through repository pattern
class Settings {
    _id;
    userId;
    theme;
    notifications;
    emailNotifications;
    language;
    timezone;
    preferences;
    createdAt;
    updatedAt;
}
exports.Settings = Settings;
//# sourceMappingURL=Settings.schema.js.map