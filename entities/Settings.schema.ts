import { EntitySchema } from 'typeorm';
import { BaseEntity } from './BaseEntity';

export interface ISettings {
  _id: string;
  userId: string;
  theme?: string;
  notifications: boolean;
  emailNotifications: boolean;
  language: string;
  timezone: string;
  preferences?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const SettingsSchema = new EntitySchema<ISettings>({
  name: 'Settings',
  tableName: 'settings',
  target: BaseEntity,
  columns: {
    _id: {
      type: 'varchar',
      primary: true,
    },
    userId: {
      type: 'varchar',
    },
    theme: {
      type: 'varchar',
      nullable: true,
    },
    notifications: {
      type: 'varchar',
      default: true,
    },
    emailNotifications: {
      type: 'varchar',
      default: true,
    },
    language: {
      type: 'varchar',
      default: 'en',
    },
    timezone: {
      type: 'varchar',
      default: 'UTC',
    },
    preferences: {
      type: 'text',
      nullable: true,
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

