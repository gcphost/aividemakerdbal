import { File } from "../entities/File";
export type FileType = string;
export interface FileReference {
    type: string;
    id: string | number;
    field?: string;
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
 * File technical metadata (extracted from file):
 * @property {string} format - File format/container (e.g., "jpeg", "mp3", "mp4")
 * @property {number} fileSize - File size in bytes (also stored in File.size column)
 * @property {string} mimeType - MIME type (also stored in File.mimeType column)
 *
 * Image-specific metadata:
 * @property {number} width - Image width in pixels
 * @property {number} height - Image height in pixels
 * @property {string} colorSpace - Color space (e.g., "srgb", "rgb")
 * @property {number} channels - Number of color channels
 * @property {boolean} hasAlpha - Whether image has alpha channel
 * @property {number} density - DPI/density
 * @property {number} orientation - EXIF orientation
 * @property {object} exif - EXIF data if available
 *
 * Audio-specific metadata:
 * @property {number} sampleRate - Sample rate in Hz
 * @property {number} bitrate - Bitrate in bits per second
 * @property {string} codec - Audio codec (e.g., "mp3", "aac", "opus")
 * @property {string} codecLongName - Full codec name
 * @property {number} channels - Number of audio channels (1=mono, 2=stereo)
 * @property {string} channelLayout - Channel layout (e.g., "stereo", "5.1")
 * @property {number} bitDepth - Bits per sample
 *
 * Video-specific metadata:
 * @property {number} fps - Frames per second
 * @property {string} frameRate - Frame rate as fraction (e.g., "30/1")
 * @property {string} videoCodec - Video codec (e.g., "h264", "vp9")
 * @property {string} videoCodecLongName - Full video codec name
 * @property {string} audioCodec - Audio codec in video (e.g., "aac")
 * @property {string} audioCodecLongName - Full audio codec name
 * @property {number} videoBitrate - Video bitrate in bits per second
 * @property {number} audioBitrate - Audio bitrate in bits per second
 * @property {number} totalBitrate - Total bitrate in bits per second
 * @property {string} pixelFormat - Pixel format (e.g., "yuv420p")
 * @property {string} aspectRatio - Aspect ratio (e.g., "16:9")
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
    format?: string;
    fileSize?: number;
    mimeType?: string;
    width?: number;
    height?: number;
    colorSpace?: string;
    channels?: number;
    hasAlpha?: boolean;
    density?: number;
    orientation?: number;
    exif?: Record<string, any>;
    sampleRate?: number;
    bitrate?: number;
    codec?: string;
    codecLongName?: string;
    channelLayout?: string;
    bitDepth?: number;
    fps?: number;
    frameRate?: string;
    videoCodec?: string;
    videoCodecLongName?: string;
    audioCodec?: string;
    audioCodecLongName?: string;
    videoBitrate?: number;
    audioBitrate?: number;
    totalBitrate?: number;
    pixelFormat?: string;
    aspectRatio?: string;
    resolution?: string;
    [key: string]: any;
}
export interface IFile extends Omit<File, "metadata" | "references" | "versionChange"> {
    references?: FileReference[] | string;
    metadata?: FileMetadata | string;
    hash?: string;
    filePath?: string;
    fileType?: string;
    versionChange?: VersionChange | null;
}
export interface VersionChange {
    changeType: "created" | "updated" | "reverted";
    reason?: string;
    timestamp?: Date;
}
//# sourceMappingURL=file.d.ts.map