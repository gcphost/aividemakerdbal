import 'reflect-metadata';
export declare class BackgroundAudio {
    _id: string;
    userId: string;
    name: string;
    title?: string;
    description?: string;
    genre?: string;
    mood?: string;
    tempo?: string;
    instrumental: boolean;
    audioUrl?: string;
    audioFileId?: string;
    duration?: number;
    volume: number;
    loop: boolean;
    searchTerm?: string;
    prompt?: string;
    status: "draft" | "processing" | "ready";
    audioGeneratedAt?: Date;
    audioGenerationTimeMs?: number;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=BackgroundAudio.d.ts.map