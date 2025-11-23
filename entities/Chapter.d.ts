import 'reflect-metadata';
export declare class Chapter {
    _id: string;
    videoId: string;
    chapterNumber: number;
    title?: string;
    description?: string;
    narrationScript?: string;
    startTime?: number;
    endTime?: number;
    audioUrl?: string;
    audioFileId?: string;
    audioDuration?: number;
    audioGeneratedAt?: Date;
    audioGenerationTimeMs?: number;
    imagePrompt?: string;
    imageUrl?: string;
    imageFileId?: string;
    imageGeneratedAt?: Date;
    imageGenerationTimeMs?: number;
    status: "draft" | "processing" | "ready";
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=Chapter.d.ts.map