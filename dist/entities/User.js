"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = exports.User = void 0;
// NO DECORATORS - Using EntitySchema instead (see User.schema.ts)
// NO extends BaseEntity - plain class to avoid TypeORM metadata initialization
// Re-export from schema file
var User_schema_1 = require("./User.schema");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return User_schema_1.User; } });
Object.defineProperty(exports, "UserSchema", { enumerable: true, get: function () { return User_schema_1.UserSchema; } });
//# sourceMappingURL=User.js.map