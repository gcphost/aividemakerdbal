// File-related types and interfaces
import { File } from '../entities/File';

export type FileType = typeof File.prototype;
export type NewFile = Omit<FileType, '_id' | 'createdAt' | 'updatedAt'>;

export interface FileReference {
  type: string; // e.g., "video", "chapter", "thumbnail"
  id: string | number; // ID of the referenced entity
  field?: string; // Optional field name (e.g., "thumbnail", "audio", "background")
}

export interface FileMetadata {
  [key: string]: any;
}

export interface IFile extends Omit<File, 'metadata' | 'references'> {
  references?: FileReference[] | string; // Can be FileReference[] or JSON string
  metadata?: FileMetadata | string; // Can be FileMetadata object or JSON string
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

