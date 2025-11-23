// NO DECORATORS - Using EntitySchema instead (see User.schema.ts)
// This file exports the class for compatibility
import { BaseEntity } from './BaseEntity';

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

// Export the schema for TypeORM registration
export { UserSchema } from './User.schema';
