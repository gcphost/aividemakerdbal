import { EntitySchema } from 'typeorm';

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
  // NO target - plain class, doesn't extend BaseEntity to avoid metadata initialization
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

// Export a plain class - NO extends BaseEntity to avoid TypeORM metadata initialization
// BaseEntity methods are available through repository pattern
export class Settings {
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

