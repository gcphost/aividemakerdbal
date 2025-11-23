import { File } from '../entities/File';
export type FileType = typeof File.prototype;
export type NewFile = Omit<FileType, '_id' | 'createdAt' | 'updatedAt'>;
export interface FileReference {
    type: string;
    id: string | number;
    field?: string;
}
export interface FileMetadata {
    [key: string]: any;
}
export interface IFile extends Omit<File, 'metadata' | 'references'> {
    references?: FileReference[] | string;
    metadata?: FileMetadata | string;
    hash?: string;
    filePath?: string;
    fileType?: string;
    versionNumber?: number;
    parentVersionId?: string | null;
    versionChange?: VersionChange | null;
    isCurrentVersion?: boolean;
    versionChainId?: string | null;
}
export interface VersionChange {
    changeType: 'created' | 'updated' | 'reverted';
    reason?: string;
    timestamp?: Date;
}
//# sourceMappingURL=file.d.ts.map