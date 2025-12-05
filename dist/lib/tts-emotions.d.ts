/**
 * Static configuration for TTS emotions and markup tags
 * This defines available emotional tags, style modifiers, and pacing controls for TTS providers
 *
 * This is the single source of truth for TTS emotion/markup tag configuration.
 * Used by app and socket-server for code highlighting, autocomplete, and tag insertion.
 */
export type TTSMarkupCategory = "non-speech-sounds" | "style-modifiers" | "vocalized-markup" | "pacing-pauses" | "voice-control" | "emotional" | "volume-energy" | "narrative-control";
export type TTSMarkupReliability = "High" | "Medium" | "Low";
export type TTSProvider = "gemini" | "elevenlabs" | "openai" | "playht";
export interface TTSMarkupTag {
    /** The markup tag itself, e.g., "[sigh]", "[sarcasm]", "[short pause]" */
    tag: string;
    /** Description of what the tag does */
    behavior: string;
    /** Reliability level of the tag */
    reliability: TTSMarkupReliability;
    /** Guidance/tips for using the tag effectively */
    guidance: string;
    /** Category/mode the tag belongs to */
    category: TTSMarkupCategory;
    /** TTS providers that support this tag */
    providers: TTSProvider[];
    /** Optional warning about the tag (e.g., for vocalized markup) */
    warning?: string;
}
/**
 * All available TTS markup tags organized by category
 */
export declare const TTS_MARKUP_TAGS: Record<TTSMarkupCategory, TTSMarkupTag[]>;
/**
 * Flat map of all tags by their tag string for quick lookup
 * Key: tag string (e.g., "[sigh]")
 * Value: TTSMarkupTag object
 */
export declare const TTS_MARKUP_TAGS_MAP: Record<string, TTSMarkupTag>;
/**
 * Get all tags as a flat array
 */
export declare const TTS_MARKUP_TAGS_LIST: TTSMarkupTag[];
/**
 * Get tags by category
 */
export declare function getTagsByCategory(category: TTSMarkupCategory): TTSMarkupTag[];
/**
 * Get tags by provider
 */
export declare function getTagsByProvider(provider: TTSProvider): TTSMarkupTag[];
/**
 * Get tags by category and provider
 */
export declare function getTagsByCategoryAndProvider(category: TTSMarkupCategory, provider: TTSProvider): TTSMarkupTag[];
/**
 * Search tags by tag name, behavior, or guidance
 */
export declare function searchTags(query: string, provider?: TTSProvider): TTSMarkupTag[];
/**
 * Get a tag by its tag string
 */
export declare function getTagByTagString(tagString: string): TTSMarkupTag | undefined;
/**
 * Get all tags for a provider, grouped by category
 */
export declare function getTagsByProviderGrouped(provider: TTSProvider): Record<TTSMarkupCategory, TTSMarkupTag[]>;
/**
 * Category metadata for display purposes
 */
export interface TTSMarkupCategoryInfo {
    id: TTSMarkupCategory;
    name: string;
    description: string;
}
export declare const TTS_MARKUP_CATEGORIES: Record<TTSMarkupCategory, TTSMarkupCategoryInfo>;
/**
 * Get category info
 */
export declare function getCategoryInfo(category: TTSMarkupCategory): TTSMarkupCategoryInfo;
/**
 * Get all categories as an array
 */
export declare function getAllCategories(): TTSMarkupCategoryInfo[];
/**
 * Check if a provider supports emotional tags
 */
export declare function providerSupportsEmotionalTags(provider: TTSProvider): boolean;
/**
 * Get all providers that support emotional tags
 */
export declare function getProvidersWithEmotionalTags(): TTSProvider[];
//# sourceMappingURL=tts-emotions.d.ts.map