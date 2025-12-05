"use strict";
/**
 * Static configuration for TTS emotions and markup tags
 * This defines available emotional tags, style modifiers, and pacing controls for TTS providers
 *
 * This is the single source of truth for TTS emotion/markup tag configuration.
 * Used by app and socket-server for code highlighting, autocomplete, and tag insertion.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TTS_MARKUP_CATEGORIES = exports.TTS_MARKUP_TAGS_LIST = exports.TTS_MARKUP_TAGS_MAP = exports.TTS_MARKUP_TAGS = void 0;
exports.getTagsByCategory = getTagsByCategory;
exports.searchTags = searchTags;
exports.getTagByTagString = getTagByTagString;
exports.getCategoryInfo = getCategoryInfo;
exports.getAllCategories = getAllCategories;
/**
 * All available TTS markup tags organized by category
 */
exports.TTS_MARKUP_TAGS = {
    "non-speech-sounds": [
        {
            tag: "[sigh]",
            behavior: "Inserts a sigh sound.",
            reliability: "High",
            guidance: "The emotional quality of the sigh is influenced by the prompt.",
            category: "non-speech-sounds",
        },
        {
            tag: "[laughing]",
            behavior: "Inserts a laugh.",
            reliability: "High",
            guidance: "For best results, use a specific prompt. e.g., a generic prompt may yield a laugh of shock, while \"react with an amused laugh\" creates a laugh of amusement.",
            category: "non-speech-sounds",
        },
        {
            tag: "[uhm]",
            behavior: "Inserts a hesitation sound.",
            reliability: "High",
            guidance: "Useful for creating a more natural, conversational feel.",
            category: "non-speech-sounds",
        },
    ],
    "style-modifiers": [
        {
            tag: "[sarcasm]",
            behavior: "Imparts a sarcastic tone on the subsequent phrase.",
            reliability: "High",
            guidance: "This tag is a powerful modifier. It demonstrates that abstract concepts can successfully steer the model's delivery.",
            category: "style-modifiers",
        },
        {
            tag: "[robotic]",
            behavior: "Makes the subsequent speech sound robotic.",
            reliability: "High",
            guidance: "The effect can extend across an entire phrase. A supportive style prompt (e.g., \"Say this in a robotic way\") is still recommended for best results.",
            category: "style-modifiers",
        },
        {
            tag: "[shouting]",
            behavior: "Increases the volume of the subsequent speech.",
            reliability: "High",
            guidance: "Most effective when paired with a matching style prompt (e.g., \"Shout this next part\") and text that implies yelling.",
            category: "style-modifiers",
        },
        {
            tag: "[whispering]",
            behavior: "Decreases the volume of the subsequent speech.",
            reliability: "High",
            guidance: "Best results are achieved when the style prompt is also explicit (e.g., \"now whisper this part as quietly as you can\").",
            category: "style-modifiers",
        },
        {
            tag: "[extremely fast]",
            behavior: "Increases the speed of the subsequent speech.",
            reliability: "High",
            guidance: "Ideal for disclaimers or fast-paced dialogue. Minimal prompt support needed.",
            category: "style-modifiers",
        },
    ],
    "vocalized-markup": [
        {
            tag: "[scared]",
            behavior: "The word \"scared\" is spoken, and the sentence adopts a scared tone.",
            reliability: "High",
            guidance: "Performance is highly dependent on text content. The phrase \"I just heard a window break\" produces a genuinely scared result. A neutral phrase produces a \"spooky\" but less authentic result.",
            category: "vocalized-markup",
            warning: "Because the tag itself is spoken, this mode is likely an undesired side effect for most use cases. Prefer using the Style Prompt to set these emotional tones instead.",
        },
        {
            tag: "[curious]",
            behavior: "The word \"curious\" is spoken, and the sentence adopts a curious tone.",
            reliability: "High",
            guidance: "Use an inquisitive phrase to support the tag's intent.",
            category: "vocalized-markup",
            warning: "Because the tag itself is spoken, this mode is likely an undesired side effect for most use cases. Prefer using the Style Prompt to set these emotional tones instead.",
        },
        {
            tag: "[bored]",
            behavior: "The word \"bored\" is spoken, and the sentence adopts a bored, monotone delivery.",
            reliability: "High",
            guidance: "Use with text that is mundane or repetitive for best effect.",
            category: "vocalized-markup",
            warning: "Because the tag itself is spoken, this mode is likely an undesired side effect for most use cases. Prefer using the Style Prompt to set these emotional tones instead.",
        },
    ],
    "pacing-pauses": [
        {
            tag: "[short pause]",
            behavior: "Inserts a brief pause, similar to a comma (~250ms).",
            reliability: "High",
            guidance: "Use to separate clauses or list items for better clarity.",
            category: "pacing-pauses",
        },
        {
            tag: "[medium pause]",
            behavior: "Inserts a standard pause, similar to a sentence break (~500ms).",
            reliability: "High",
            guidance: "Effective for separating distinct sentences or thoughts.",
            category: "pacing-pauses",
        },
        {
            tag: "[long pause]",
            behavior: "Inserts a significant pause for dramatic effect (~1000ms+).",
            reliability: "High",
            guidance: "Use for dramatic timing. For example: \"The answer is... [long pause] ...no.\" Avoid overuse, as it can sound unnatural.",
            category: "pacing-pauses",
        },
    ],
};
/**
 * Flat map of all tags by their tag string for quick lookup
 * Key: tag string (e.g., "[sigh]")
 * Value: TTSMarkupTag object
 */
exports.TTS_MARKUP_TAGS_MAP = Object.values(exports.TTS_MARKUP_TAGS)
    .flat()
    .reduce((acc, tag) => {
    acc[tag.tag] = tag;
    return acc;
}, {});
/**
 * Get all tags as a flat array
 */
exports.TTS_MARKUP_TAGS_LIST = Object.values(exports.TTS_MARKUP_TAGS).flat();
/**
 * Get tags by category
 */
function getTagsByCategory(category) {
    return exports.TTS_MARKUP_TAGS[category] || [];
}
/**
 * Search tags by tag name, behavior, or guidance
 */
function searchTags(query) {
    const lowerQuery = query.toLowerCase();
    return exports.TTS_MARKUP_TAGS_LIST.filter((tag) => tag.tag.toLowerCase().includes(lowerQuery) ||
        tag.behavior.toLowerCase().includes(lowerQuery) ||
        tag.guidance.toLowerCase().includes(lowerQuery));
}
/**
 * Get a tag by its tag string
 */
function getTagByTagString(tagString) {
    return exports.TTS_MARKUP_TAGS_MAP[tagString];
}
exports.TTS_MARKUP_CATEGORIES = {
    "non-speech-sounds": {
        id: "non-speech-sounds",
        name: "Non-Speech Sounds",
        description: "The markup is replaced by an audible, non-speech vocalization (e.g., a sigh, a laugh). The tag itself is not spoken. These are excellent for adding realistic, human-like hesitations and reactions.",
    },
    "style-modifiers": {
        id: "style-modifiers",
        name: "Style Modifiers",
        description: "The markup is not spoken, but it modifies the delivery of the subsequent speech. The scope and duration of the modification can vary.",
    },
    "vocalized-markup": {
        id: "vocalized-markup",
        name: "Vocalized Markup (Adjectives)",
        description: "The markup tag itself is spoken as a word, while also influencing the tone of the entire sentence. This behavior typically applies to emotional adjectives.",
    },
    "pacing-pauses": {
        id: "pacing-pauses",
        name: "Pacing and Pauses",
        description: "These tags insert silence into the generated audio, giving you granular control over rhythm, timing, and pacing. Standard punctuation (commas, periods, semicolons) will also create natural pauses, but these tags offer more explicit control.",
    },
};
/**
 * Get category info
 */
function getCategoryInfo(category) {
    return exports.TTS_MARKUP_CATEGORIES[category];
}
/**
 * Get all categories as an array
 */
function getAllCategories() {
    return Object.values(exports.TTS_MARKUP_CATEGORIES);
}
//# sourceMappingURL=tts-emotions.js.map