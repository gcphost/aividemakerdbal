"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsSchema = exports.Settings = void 0;
// NO DECORATORS - Using EntitySchema instead (see Settings.schema.ts)
// This file exports the class for compatibility
const BaseEntity_1 = require("./BaseEntity");
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
// Export the schema for TypeORM registration
var Settings_schema_1 = require("./Settings.schema");
Object.defineProperty(exports, "SettingsSchema", { enumerable: true, get: function () { return Settings_schema_1.SettingsSchema; } });
//# sourceMappingURL=Settings.js.map