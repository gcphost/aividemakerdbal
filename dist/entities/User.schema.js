"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserSchema = void 0;
const typeorm_1 = require("typeorm");
const BaseEntity_1 = require("./BaseEntity");
exports.UserSchema = new typeorm_1.EntitySchema({
    name: 'User',
    tableName: 'users',
    target: BaseEntity_1.BaseEntity,
    columns: {
        _id: {
            type: 'varchar',
            primary: true,
        },
        email: {
            type: 'varchar',
            unique: true,
        },
        password: {
            type: 'varchar',
        },
        firstName: {
            type: 'varchar',
            nullable: true,
        },
        lastName: {
            type: 'varchar',
            nullable: true,
        },
        avatarUrl: {
            type: 'varchar',
            nullable: true,
        },
        role: {
            type: 'varchar',
            default: 'user',
        },
        isActive: {
            type: 'varchar',
            default: true,
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
//# sourceMappingURL=User.schema.js.map