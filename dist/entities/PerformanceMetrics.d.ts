import { BaseEntity } from './BaseEntity';
export declare class PerformanceMetrics extends BaseEntity {
    _id: string;
    userId: string;
    date: string;
    metric: string;
    value: number;
    unit?: string;
    metadata?: string;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=PerformanceMetrics.d.ts.map