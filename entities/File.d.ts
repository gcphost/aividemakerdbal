import 'reflect-metadata';
export declare class File {
    _id: string;
    userId: string;
    filename: string;
    originalName: string;
    mimeType?: string;
    size: number;
    path?: string;
    url?: string;
    thumbnailUrl?: string;
    publicUrl?: string;
    status: "draft" | "processing" | "ready";
    type?: string;
    category?: string;
    metadata?: string;
    vectorEmbedding?: string;
    versions?: string;
    isPublic: boolean;
    expiresAt?: Date;
    lastAccessedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=File.d.ts.map