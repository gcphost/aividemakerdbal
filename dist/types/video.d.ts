import { Video } from "../entities/Video";
export type VideoType = typeof Video.prototype;
export type NewVideo = Omit<VideoType, "_id" | "createdAt" | "updatedAt">;
export type VideoStatus = "draft" | "processing" | "ready" | "published";
export interface ImageSource {
    id: string;
    prompt: string;
    title?: string;
    description?: string;
    searchTerm?: string;
    fileId?: string;
    desiredResolution?: string;
    aspectRatio?: string;
}
export interface SoundSource {
    id: string;
    prompt: string;
    title?: string;
    description?: string;
    searchTerm?: string;
    type: string;
    fileId?: string;
    waveformPeaks?: number[];
    volume?: number;
    duration?: number;
    loop?: boolean;
    promptInfluence?: number;
    voiceSourceId?: string;
    voiceIndex?: number;
}
export interface AudioSource {
    id: string;
    fileId?: string;
    name: string;
    title?: string;
    searchTerm?: string;
    prompt?: string;
    description?: string;
    genre?: string;
    mood?: string;
    tempo?: string;
    instrumental?: boolean;
    waveformPeaks?: number[];
    volume?: number;
    duration?: number;
    loop?: boolean;
}
export interface VideoSource {
    id: string;
    prompt: string;
    title?: string;
    searchTerm?: string;
    fileId?: string;
    duration?: number;
    resolution?: string;
    desiredResolution?: string;
    aspectRatio?: string;
    loop?: boolean;
    isGenerating?: boolean;
    generationError?: string;
    metadata?: {
        veoVideoObject?: any;
        extendedFrom?: string;
        [key: string]: any;
    };
}
export interface ScriptGenerationContext {
    chapterTitle: string;
    chapterDescription: string;
    chapterDuration: number;
    narratorPrompt?: string;
    narratorTone?: string;
    narratorPersonality?: string;
    targetAudience?: string;
    contentCategory?: string;
    videoStyle?: string;
    videoSubject?: string;
    videoDescription?: string;
    chapterTransitionPrompt?: string;
    imageDescriptionPrompt?: string;
    wordsPerMinute?: number;
    contentSource?: string;
    isEmotionalTagsEnabled?: boolean;
    ttsProvider?: string;
    maxImagesPerChapter?: number;
    imagesPerMinute?: number;
    previousChaptersCount?: number;
    futureChaptersCount?: number;
    generatedAt?: string;
    generatedBy?: string;
    model?: string;
    profileId?: string;
    channelId?: string;
}
export interface VoiceSource {
    id: string;
    title?: string;
    prompt?: string;
    fileId?: string;
    duration?: number;
    startTime?: number;
    endTime?: number;
    waveformPeaks?: number[];
    elevenLabsRequestId?: string;
    scriptStatus?: "pending" | "completed";
    generationContext?: ScriptGenerationContext;
    isPlaceholder?: boolean;
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
    isGenerating?: boolean;
}
export interface SoundTimelineInstance {
    type: "sound";
    id?: string;
    sourceId: string;
    startTime: number;
    endTime: number;
    volume?: number;
    loop?: boolean;
    isGenerating?: boolean;
}
export interface AudioTimelineInstance {
    type: "audio";
    id?: string;
    sourceId: string;
    startTime: number;
    endTime: number;
    volume?: number;
    loop?: boolean;
    isGenerating?: boolean;
}
export interface VideoTimelineInstance {
    type: "video";
    id?: string;
    sourceId: string;
    startTime: number;
    endTime: number;
    loop?: boolean;
    videoStartOffset?: number;
    isGenerating?: boolean;
}
export interface VoiceTimelineInstance {
    type: "voice";
    id?: string;
    sourceId: string;
    startTime: number;
    endTime: number;
    duration?: number;
    title?: string;
    audioUrl?: string;
    audioFileId?: string;
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
export type TimelineInstance = ImageTimelineInstance | SoundTimelineInstance | AudioTimelineInstance | VideoTimelineInstance | VoiceTimelineInstance | TextTimelineInstance;
export interface TimelineLayer {
    id: string;
    label: string;
    type?: "image" | "sound" | "audio" | "video" | "voice" | "text";
    visible: boolean;
    locked: boolean;
    items: TimelineInstance[];
}
export type VideoQuality = "preview" | "ultra-low" | "low" | "medium" | "high" | "2k" | "4k" | "vertical-hd" | "vertical-4k" | "square" | "custom";
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
//# sourceMappingURL=video.d.ts.map