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
    generatedImageUrl?: string;
    generatedImageFileId?: string;
    fileId?: string;
    resolvedUrl?: string;
    imageUrl?: string;
    isReused?: boolean;
    reusedFrom?: {
        videoSubject?: string;
        chapterTitle?: string;
        similarity?: number;
    };
}
export interface SoundSource {
    id: string;
    prompt: string;
    title?: string;
    description?: string;
    searchTerm?: string;
    type: string;
    audioUrl?: string;
    fileId?: string;
    volume?: number;
    duration?: number;
    loop?: boolean;
}
export interface BackgroundAudioSource {
    id: string;
    fileId?: string;
    audioFileId?: string;
    name: string;
    title?: string;
    searchTerm?: string;
    prompt?: string;
    description?: string;
    genre?: string;
    mood?: string;
    tempo?: string;
    instrumental?: boolean;
    audioUrl?: string;
    imageUrl?: string;
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
    generatedVideoFileId?: string | number;
    generatedVideoUrl?: string;
    resolvedUrl?: string;
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
}
export interface ImageTimelineInstance {
    type: "image";
    id?: string;
    sourceId: string;
    startTime: number;
    endTime: number;
    generatedImageUrl?: string;
    generatedImageFileId?: string;
    resolvedUrl?: string;
    kenBurnsConfig?: {
        startScale?: number;
        endScale?: number;
        startX?: number;
        startY?: number;
        endX?: number;
        endY?: number;
    };
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
export interface BackgroundAudioTimelineInstance {
    type: "backgroundAudio";
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
export type TimelineInstance = ImageTimelineInstance | SoundTimelineInstance | BackgroundAudioTimelineInstance | VideoTimelineInstance | TextTimelineInstance;
export interface TimelineLayer {
    id: string;
    label: string;
    type?: "image" | "sound" | "backgroundAudio" | "video" | "text";
    visible: boolean;
    locked: boolean;
    items: TimelineInstance[];
}
export interface TimelineData {
    duration: number;
    endTime?: number;
    videoId?: string;
    text?: string;
    layers: TimelineLayer[];
    sources: {
        images: ImageSource[];
        sounds: SoundSource[];
        backgroundAudio: BackgroundAudioSource[];
        videos: VideoSource[];
    };
}
//# sourceMappingURL=video.d.ts.map