"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefaultTimelineSources = createDefaultTimelineSources;
exports.createDefaultTimelineLayer = createDefaultTimelineLayer;
exports.createDefaultTimelineData = createDefaultTimelineData;
exports.parseTimeline = parseTimeline;
/**
 * Creates a default timeline sources object with all source arrays initialized to empty arrays.
 * This ensures consistency across all handlers and prevents missing arrays.
 *
 * @returns Default sources object with images, sounds, backgroundAudio, and videos arrays
 */
function createDefaultTimelineSources() {
    return {
        images: [],
        sounds: [],
        backgroundAudio: [],
        videos: [],
    };
}
/**
 * Creates a default timeline layer with all required fields properly initialized.
 *
 * @param id - Unique identifier for the layer
 * @param label - Display label for the layer
 * @param type - Optional type of the layer (image, sound, backgroundAudio, video, text)
 * @param items - Optional initial items array (defaults to empty array)
 * @returns TimelineLayer object with all required fields
 */
function createDefaultTimelineLayer(id, label, type, items = []) {
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
function createDefaultTimelineData() {
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
function parseTimeline(timeline) {
    if (!timeline)
        return null;
    if (typeof timeline === 'string') {
        try {
            return JSON.parse(timeline);
        }
        catch {
            return null;
        }
    }
    return timeline;
}
//# sourceMappingURL=timeline-helpers.js.map