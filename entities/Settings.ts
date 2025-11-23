// NO DECORATORS - Using EntitySchema instead (see Settings.schema.ts)
// This file exports the class for compatibility
import { BaseEntity } from './BaseEntity';

export class Settings extends BaseEntity {
  _id!: string;
  userId!: string;
  theme?: string;
  notifications!: boolean;
  emailNotifications!: boolean;
  language!: string;
  timezone!: string;
  preferences?: string;
  createdAt!: Date;
  updatedAt!: Date;
}

// Export the schema for TypeORM registration
export { SettingsSchema } from './Settings.schema';
