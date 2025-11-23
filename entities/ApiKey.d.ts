import 'reflect-metadata';
export declare class ApiKey {
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