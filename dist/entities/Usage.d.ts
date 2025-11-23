import { BaseEntity } from './BaseEntity';
export declare class Usage extends BaseEntity {
    _id: string;
    userId: string;
    date: string;
    videoId?: string;
    chapterId?: string;
    service: string;
    action: string;
    serviceType?: string;
    provider?: string;
    operation?: string;
    model?: string;
    tokens?: number;
    characters?: number;
    images?: number;
    duration?: number;
    cost: number;
    currency: string;
    metadata?: string;
    inputTokens?: number;
    outputTokens?: number;
    durationMs?: number;
    fileSize?: number;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=Usage.d.ts.map