"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsSchema = exports.Settings = void 0;
// NO DECORATORS - Using EntitySchema instead (see Settings.schema.ts)
// NO extends BaseEntity - plain class to avoid TypeORM metadata initialization
// Re-export from schema file
var Settings_schema_1 = require("./Settings.schema");
Object.defineProperty(exports, "Settings", { enumerable: true, get: function () { return Settings_schema_1.Settings; } });
Object.defineProperty(exports, "SettingsSchema", { enumerable: true, get: function () { return Settings_schema_1.SettingsSchema; } });
//# sourceMappingURL=Settings.js.map