"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = exports.User = void 0;
// NO DECORATORS - Using EntitySchema instead (see User.schema.ts)
// This file exports the class for compatibility
const BaseEntity_1 = require("./BaseEntity");
class User extends BaseEntity_1.BaseEntity {
    _id;
    email;
    password;
    firstName;
    lastName;
    avatarUrl;
    role;
    isActive;
    createdAt;
    updatedAt;
}
exports.User = User;
// Export the schema for TypeORM registration
var User_schema_1 = require("./User.schema");
Object.defineProperty(exports, "UserSchema", { enumerable: true, get: function () { return User_schema_1.UserSchema; } });
//# sourceMappingURL=User.js.map