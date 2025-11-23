import { BaseEntity } from './BaseEntity';
export declare class Process extends BaseEntity {
    _id: string;
    processId?: string;
    userId: string;
    type: string;
    videoId?: string;
    chapterId?: string;
    fileId?: string;
    resourceId?: string;
    serverId?: string;
    groupId?: string;
    parentProcessId?: string;
    isMaster: boolean;
    stage?: string;
    message?: string;
    currentStep?: number;
    totalSteps?: number;
    stepName?: string;
    currentChapter?: number;
    totalChapters?: number;
    metadata?: string;
    status: "pending" | "running" | "completed" | "failed" | "queued" | "processing";
    config?: string;
    result?: string;
    progress?: number;
    error?: string;
    startedAt?: Date;
    completedAt?: Date;
    durationMs?: number;
    pid?: number;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=Process.d.ts.map