// Video-related types and interfaces
import { Video } from "../entities/Video";

export type VideoType = typeof Video.prototype;
export type NewVideo = Omit<VideoType, "_id" | "createdAt" | "updatedAt">;

export type VideoStatus = "draft" | "processing" | "ready" | "published";

// Timeline-related types
export interface ImageSource {
  id: string;
  prompt: string;
  title?: string;
  description?: string;
  searchTerm?: string;
  fileId?: string; // Standardized file reference - URLs come from File.publicUrl
  // Note: provider/model/providerSettings are stored in File metadata, not here
  // Note: Reuse tracking is done via File.references, not isReused/reusedFrom
}

export interface SoundSource {
  id: string;
  prompt: string;
  title?: string;
  description?: string; // User-friendly summary of the sound
  searchTerm?: string;
  type: string;
  fileId?: string; // Standardized file reference - URLs come from File.publicUrl
  waveformPeaks?: number[]; // Can also come from File.metadata
  volume?: number;
  duration?: number;
  loop?: boolean;
  promptInfluence?: number;
  // Note: provider/model/providerSettings are stored in File metadata, not here
}

export interface AudioSource {
  id: string;
  fileId?: string; // Standardized file reference - URLs come from File.publicUrl
  name: string;
  title?: string;
  searchTerm?: string;
  prompt?: string;
  description?: string;
  genre?: string;
  mood?: string;
  tempo?: string;
  instrumental?: boolean;
  waveformPeaks?: number[]; // Can also come from File.metadata
  volume?: number;
  duration?: number;
  loop?: boolean;
  // Note: provider/model/providerSettings are stored in File metadata, not here
}

export interface VideoSource {
  id: string;
  prompt: string;
  title?: string;
  searchTerm?: string;
  fileId?: string; // Standardized file reference - URLs come from File.publicUrl
  duration?: number;
  resolution?: string;
  aspectRatio?: string;
  loop?: boolean;
  isGenerating?: boolean;
  generationError?: string;
  metadata?: {
    veoVideoObject?: any;
    extendedFrom?: string;
    [key: string]: any;
  };
  // Note: provider/model/providerSettings are stored in File metadata, not here
}

export interface VoiceSource {
  id: string;
  title?: string;
  prompt?: string; // The TTS text (formerly narrationScript)
  fileId?: string; // Standardized file reference - URLs come from File.publicUrl
  duration?: number;
  waveformPeaks?: number[]; // Can also come from File.metadata
  // Provider info stored in File.metadata
}

export interface ImageTimelineInstance {
  type: "image";
  id?: string;
  sourceId: string;
  startTime: number;
  endTime: number;
  kenBurnsConfig?: {
    startScale?: number;
    endScale?: number;
    startX?: number;
    startY?: number;
    endX?: number;
    endY?: number;
  };
  // Note: URLs and fileId come from the source, not the instance
}

export interface SoundTimelineInstance {
  type: "sound";
  id?: string;
  sourceId: string;
  startTime: number;
  endTime: number;
  volume?: number;
  loop?: boolean;
}

export interface AudioTimelineInstance {
  type: "audio";
  id?: string;
  sourceId: string;
  startTime: number;
  endTime: number;
  volume?: number;
  loop?: boolean;
}

export interface VideoTimelineInstance {
  type: "video";
  id?: string;
  sourceId: string;
  startTime: number;
  endTime: number;
  loop?: boolean;
}

export interface VoiceTimelineInstance {
  type: "voice";
  id?: string;
  sourceId: string;
  startTime: number;
  endTime: number;
  volume?: number;
}

export interface TextTimelineInstance {
  type: "text";
  id?: string;
  content: string;
  startTime: number;
  endTime: number;
  style?: {
    fontSize?: number;
    fontFamily?: string;
    color?: string;
    fontWeight?: string;
    textAlign?: "left" | "center" | "right";
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    backgroundColor?: string;
    borderRadius?: number;
    padding?: number;
  };
}

export type TimelineInstance =
  | ImageTimelineInstance
  | SoundTimelineInstance
  | AudioTimelineInstance
  | VideoTimelineInstance
  | VoiceTimelineInstance
  | TextTimelineInstance;

export interface TimelineLayer {
  id: string;
  label: string;
  type?: "image" | "sound" | "audio" | "video" | "voice" | "text";
  visible: boolean;
  locked: boolean;
  items: TimelineInstance[];
}

export type VideoQuality =
  | "preview"
  | "ultra-low"
  | "low"
  | "medium"
  | "high"
  | "2k"
  | "4k"
  | "vertical-hd"
  | "vertical-4k"
  | "square"
  | "custom";

export interface TimelineData {
  duration: number;
  endTime?: number;
  videoId?: string;
  text?: string;
  layers: TimelineLayer[];
  sources: {
    images: ImageSource[];
    sounds: SoundSource[];
    audio: AudioSource[];
    videos: VideoSource[];
    voices: VoiceSource[];
  };
}
