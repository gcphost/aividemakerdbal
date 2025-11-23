import 'reflect-metadata';
export declare class ProcessEstimate {
    _id: string;
    userId: string;
    processType: string;
    videoId?: string;
    chapterId?: string;
    fileId?: string;
    estimatedDurationMs: number;
    estimatedCost: number;
    currency: string;
    breakdown?: string;
    expiresAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=ProcessEstimate.d.ts.map