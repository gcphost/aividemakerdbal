import { BaseEntity } from './BaseEntity';
export declare class ApiKey extends BaseEntity {
    _id: string;
    userId: string;
    service: string;
    apiKey?: string;
    apiSecret?: string;
    apiUrl?: string;
    model?: string;
    isActive: boolean;
    config?: string;
    lastUsedAt?: Date;
    usageCount?: number;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=ApiKey.d.ts.map