import { BaseEntity } from './BaseEntity';
export declare class Settings extends BaseEntity {
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
//# sourceMappingURL=Settings.d.ts.map