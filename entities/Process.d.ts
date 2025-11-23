import 'reflect-metadata';
export declare class Process {
    _id: string;
    userId: string;
    type: string;
    videoId?: string;
    chapterId?: string;
    fileId?: string;
    status: "pending" | "running" | "completed" | "failed";
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