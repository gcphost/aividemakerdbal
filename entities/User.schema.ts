import { EntitySchema } from 'typeorm';

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
export class User {
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

