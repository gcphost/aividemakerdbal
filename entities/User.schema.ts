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

export const UserSchema = new EntitySchema<IUser>({
  name: 'User',
  tableName: 'users',
  target: BaseEntity,
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
export class User extends BaseEntity {
  _id!: string;
  email!: string;
  password!: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  role!: 'admin' | 'user';
  isActive!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
}

