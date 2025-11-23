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
export declare const SettingsSchema: EntitySchema<ISettings>;
export declare class Settings {
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
//# sourceMappingURL=Settings.schema.d.ts.map