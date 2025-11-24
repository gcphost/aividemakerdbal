import { BaseEntity } from './BaseEntity';
export declare class User extends BaseEntity {
    _id: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    avatarUrl?: string;
    role: 'admin' | 'user';
    isActive: boolean;
    defaultProfileId?: string;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=User.d.ts.map