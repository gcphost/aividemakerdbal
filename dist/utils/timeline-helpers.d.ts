import { TimelineData, TimelineLayer, TimelineInstance, ImageSource, SoundSource, BackgroundAudioSource, VideoSource } from '../types/video';
/**
 * Creates a default timeline sources object with all source arrays initialized to empty arrays.
 * This ensures consistency across all handlers and prevents missing arrays.
 *
 * @returns Default sources object with images, sounds, backgroundAudio, and videos arrays
 */
export declare function createDefaultTimelineSources(): {
    images: ImageSource[];
    sounds: SoundSource[];
    backgroundAudio: BackgroundAudioSource[];
    videos: VideoSource[];
};
/**
 * Creates a default timeline layer with all required fields properly initialized.
 *
 * @param id - Unique identifier for the layer
 * @param label - Display label for the layer
 * @param type - Optional type of the layer (image, sound, backgroundAudio, video, text)
 * @param items - Optional initial items array (defaults to empty array)
 * @returns TimelineLayer object with all required fields
 */
export declare function createDefaultTimelineLayer(id: string, label: string, type?: 'image' | 'sound' | 'backgroundAudio' | 'video' | 'text', items?: TimelineInstance[]): TimelineLayer;
/**
 * Creates a default timeline data object with duration, empty layers, and default sources.
 *
 * @returns Complete TimelineData object with all required fields initialized
 */
export declare function createDefaultTimelineData(): TimelineData;
//# sourceMappingURL=timeline-helpers.d.ts.map