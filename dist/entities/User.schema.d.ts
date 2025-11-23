import { EntitySchema } from 'typeorm';
import { BaseEntity } from './BaseEntity';
export interface IUser {
    _id: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    avatarUrl?: string;
    role: 'admin' | 'user';
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare const UserSchema: EntitySchema<IUser>;
export declare class User extends BaseEntity {
    _id: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    avatarUrl?: string;
    role: 'admin' | 'user';
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=User.schema.d.ts.map