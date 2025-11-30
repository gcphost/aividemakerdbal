// File-related types and interfaces
import { File } from "../entities/File";

export type FileType = typeof File.prototype;
export type NewFile = Omit<FileType, "_id" | "createdAt" | "updatedAt">;

export interface FileReference {
  type: string; // e.g., "video", "chapter", "thumbnail"
  id: string | number; // ID of the referenced entity
  field?: string; // Optional field name (e.g., "thumbnail", "audio", "background")
}

/**
 * Metadata stored with a file, tracking its origin and additional context.
 *
 * Standard fields (all files should have):
 * @property {string} source - Required. Either "uploaded" or "ai-generated" to track file origin
 * @property {string} type - Optional. Categorizes the file (e.g., "library-image", "timeline-video")
 *
 * For AI-generated files only:
 * @property {string} provider - Optional. Name of the AI provider (e.g., "Gemini", "Runway", "ElevenLabs", "Suno")
 * @property {string} model - Optional. Name of the AI model used (e.g., "dall-e-3", "gemini-2.5-flash", "eleven_multilingual_v2")
 * @property {object} providerSettings - Optional. Provider-specific configuration used for generation
 *
 * For any file type:
 * @property {string} videoId - Optional. References a video if file belongs to a video
 * @property {string} chapterId - Optional. References a chapter if file belongs to a chapter
 * @property {number[]} waveformPeaks - Optional. Waveform data for audio files
 * @property {string} searchTerm - Optional. Search term used to find/generate this file
 * @property {number} duration - Optional. Duration for audio/video files
 *
 * Additional properties may be added as needed for specific file types.
 */
export interface FileMetadata {
  source?: "uploaded" | "ai-generated";
  type?: string;
  provider?: string;
  model?: string;
  providerSettings?: any;
  videoId?: string;
  chapterId?: string;
  waveformPeaks?: number[];
  searchTerm?: string;
  duration?: number;
  [key: string]: any;
}

export interface IFile extends Omit<File, "metadata" | "references" | "versionChange"> {
  references?: FileReference[] | string; // Can be FileReference[] or JSON string
  metadata?: FileMetadata | string; // Can be FileMetadata object or JSON string
  hash?: string;
  filePath?: string;
  fileType?: string;
  // Override versionChange to be parsed object instead of string
  versionChange?: VersionChange | null;
}

export interface VersionChange {
  changeType: "created" | "updated" | "reverted";
  reason?: string;
  timestamp?: Date;
}
