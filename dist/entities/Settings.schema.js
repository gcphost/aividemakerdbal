"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = exports.SettingsSchema = void 0;
const typeorm_1 = require("typeorm");
const BaseEntity_1 = require("./BaseEntity");
exports.SettingsSchema = new typeorm_1.EntitySchema({
    name: 'Settings',
    tableName: 'settings',
    target: BaseEntity_1.BaseEntity,
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
// Export a class for compatibility - no decorators needed
class Settings extends BaseEntity_1.BaseEntity {
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