import { BaseEntity } from './BaseEntity';
export declare class ProcessEstimate extends BaseEntity {
    _id: string;
    userId: string;
    processType: string;
    serviceType?: string;
    provider?: string;
    model?: string;
    operation?: string;
    timePerUnit?: number;
    unitType?: string;
    sampleCount?: number;
    lastCalculated?: Date;
    videoId?: string;
    chapterId?: string;
    fileId?: string;
    estimatedDurationMs?: number;
    estimatedCost?: number;
    currency?: string;
    breakdown?: string;
    expiresAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=ProcessEstimate.d.ts.map