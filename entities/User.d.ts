import 'reflect-metadata';
export declare class User {
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
//# sourceMappingURL=User.d.ts.map