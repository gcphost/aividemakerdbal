import {
  TimelineData,
  TimelineLayer,
  TimelineInstance,
  ImageSource,
  SoundSource,
  AudioSource,
  VideoSource,
  VoiceSource,
} from "../types/video";

/**
 * Creates a default timeline sources object with all source arrays initialized to empty arrays.
 * This ensures consistency across all handlers and prevents missing arrays.
 *
 * @returns Default sources object with images, sounds, audio, videos, and voices arrays
 */
export function createDefaultTimelineSources(): {
  images: ImageSource[];
  sounds: SoundSource[];
  audio: AudioSource[];
  videos: VideoSource[];
  voices: VoiceSource[];
} {
  return {
    images: [],
    sounds: [],
    audio: [],
    videos: [],
    voices: [],
  };
}

/**
 * Creates a default timeline layer with all required fields properly initialized.
 *
 * @param id - Unique identifier for the layer
 * @param label - Display label for the layer
 * @param type - Optional type of the layer (image, sound, audio, video, text)
 * @param items - Optional initial items array (defaults to empty array)
 * @returns TimelineLayer object with all required fields
 */
export function createDefaultTimelineLayer(
  id: string,
  label: string,
  type?: "image" | "sound" | "audio" | "video" | "text",
  items: TimelineInstance[] = []
): TimelineLayer {
  return {
    id,
    label,
    ...(type && { type }),
    visible: true,
    locked: false,
    items,
  };
}

/**
 * Creates a default timeline data object with duration, empty layers, and default sources.
 *
 * @returns Complete TimelineData object with all required fields initialized
 */
export function createDefaultTimelineData(): TimelineData {
  return {
    duration: 0,
    layers: [],
    sources: createDefaultTimelineSources(),
  };
}

/**
 * Parses a timeline that may be stored as a JSON string or already as an object.
 * Handles the common pattern where timeline data may come from DB as string or object.
 *
 * @param timeline - The timeline data, either as a JSON string or TimelineData object
 * @returns Parsed TimelineData object, or null if input is null/undefined/invalid
 */
export function parseTimeline(
  timeline: string | TimelineData | null | undefined
): TimelineData | null {
  if (!timeline) return null;
  if (typeof timeline === "string") {
    try {
      return JSON.parse(timeline);
    } catch {
      return null;
    }
  }
  return timeline;
}
