import { BaseEntity } from './BaseEntity';
export declare class File extends BaseEntity {
    _id: string;
    userId: string;
    filename: string;
    mimeType?: string;
    size: number;
    path?: string;
    url?: string;
    thumbnailUrl?: string;
    publicUrl?: string;
    status: "draft" | "processing" | "ready";
    type?: string;
    category?: string;
    title: string;
    description?: string;
    prompt?: string;
    volume?: string;
    loop?: string;
    duration?: number;
    hash?: string;
    metadata?: string;
    vectorEmbedding?: string;
    versions?: string;
    references?: string;
    versionNumber?: number;
    parentVersionId?: string;
    versionChainId?: string;
    isCurrentVersion?: boolean;
    versionChange?: string;
    isPublic: boolean;
    expiresAt?: Date;
    lastAccessedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=File.d.ts.map