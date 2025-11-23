"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserSchema = void 0;
const typeorm_1 = require("typeorm");
exports.UserSchema = new typeorm_1.EntitySchema({
    name: 'User',
    tableName: 'users',
    // NO target - plain class, doesn't extend BaseEntity to avoid metadata initialization
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
// Export a plain class - NO extends BaseEntity to avoid TypeORM metadata initialization
// BaseEntity methods are available through repository pattern
class User {
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