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
exports.getTagsByProvider = getTagsByProvider;
exports.getTagsByCategoryAndProvider = getTagsByCategoryAndProvider;
exports.searchTags = searchTags;
exports.getTagByTagString = getTagByTagString;
exports.getTagsByProviderGrouped = getTagsByProviderGrouped;
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
            providers: ["gemini", "elevenlabs"],
        },
        {
            tag: "[laughing]",
            behavior: "Inserts a laugh.",
            reliability: "High",
            guidance: "For best results, use a specific prompt. e.g., a generic prompt may yield a laugh of shock, while \"react with an amused laugh\" creates a laugh of amusement.",
            category: "non-speech-sounds",
            providers: ["gemini"],
        },
        {
            tag: "[uhm]",
            behavior: "Inserts a hesitation sound.",
            reliability: "High",
            guidance: "Useful for creating a more natural, conversational feel.",
            category: "non-speech-sounds",
            providers: ["gemini"],
        },
        {
            tag: "[gasp]",
            behavior: "Inserts a gasp sound.",
            reliability: "High",
            guidance: "Useful for expressing surprise or shock.",
            category: "non-speech-sounds",
            providers: ["elevenlabs"],
        },
        {
            tag: "[laughs]",
            behavior: "Inserts a laugh sound.",
            reliability: "High",
            guidance: "Useful for adding humor or lightheartedness to narration.",
            category: "non-speech-sounds",
            providers: ["elevenlabs"],
        },
        {
            tag: "[chuckles]",
            behavior: "Inserts a chuckle sound.",
            reliability: "High",
            guidance: "Useful for a softer, more subtle laugh.",
            category: "non-speech-sounds",
            providers: ["elevenlabs"],
        },
        {
            tag: "[clears throat]",
            behavior: "Inserts a throat clearing sound.",
            reliability: "High",
            guidance: "Useful for creating a more natural, human-like pause or transition.",
            category: "non-speech-sounds",
            providers: ["elevenlabs"],
        },
        {
            tag: "[gulps]",
            behavior: "Inserts a gulp sound.",
            reliability: "High",
            guidance: "Useful for expressing nervousness or anticipation.",
            category: "non-speech-sounds",
            providers: ["elevenlabs"],
        },
        {
            tag: "[sob]",
            behavior: "Inserts a sob sound.",
            reliability: "High",
            guidance: "Useful for expressing sadness or emotional distress.",
            category: "non-speech-sounds",
            providers: ["elevenlabs"],
        },
        {
            tag: "[cries]",
            behavior: "Inserts a crying sound.",
            reliability: "High",
            guidance: "Useful for expressing strong sadness or emotional moments.",
            category: "non-speech-sounds",
            providers: ["elevenlabs"],
        },
    ],
    "style-modifiers": [
        {
            tag: "[sarcasm]",
            behavior: "Imparts a sarcastic tone on the subsequent phrase.",
            reliability: "High",
            guidance: "This tag is a powerful modifier. It demonstrates that abstract concepts can successfully steer the model's delivery.",
            category: "style-modifiers",
            providers: ["gemini"],
        },
        {
            tag: "[robotic]",
            behavior: "Makes the subsequent speech sound robotic.",
            reliability: "High",
            guidance: "The effect can extend across an entire phrase. A supportive style prompt (e.g., \"Say this in a robotic way\") is still recommended for best results.",
            category: "style-modifiers",
            providers: ["gemini"],
        },
        {
            tag: "[shouting]",
            behavior: "Increases the volume of the subsequent speech.",
            reliability: "High",
            guidance: "Most effective when paired with a matching style prompt (e.g., \"Shout this next part\") and text that implies yelling.",
            category: "style-modifiers",
            providers: ["gemini", "elevenlabs"],
        },
        {
            tag: "[whispering]",
            behavior: "Decreases the volume of the subsequent speech.",
            reliability: "High",
            guidance: "Best results are achieved when the style prompt is also explicit (e.g., \"now whisper this part as quietly as you can\").",
            category: "style-modifiers",
            providers: ["gemini", "elevenlabs"],
        },
        {
            tag: "[extremely fast]",
            behavior: "Increases the speed of the subsequent speech.",
            reliability: "High",
            guidance: "Ideal for disclaimers or fast-paced dialogue. Minimal prompt support needed.",
            category: "style-modifiers",
            providers: ["gemini"],
        },
    ],
    "vocalized-markup": [
        {
            tag: "[scared]",
            behavior: "The word \"scared\" is spoken, and the sentence adopts a scared tone.",
            reliability: "High",
            guidance: "Performance is highly dependent on text content. The phrase \"I just heard a window break\" produces a genuinely scared result. A neutral phrase produces a \"spooky\" but less authentic result.",
            category: "vocalized-markup",
            providers: ["gemini"],
            warning: "Because the tag itself is spoken, this mode is likely an undesired side effect for most use cases. Prefer using the Style Prompt to set these emotional tones instead.",
        },
        {
            tag: "[curious]",
            behavior: "The word \"curious\" is spoken, and the sentence adopts a curious tone.",
            reliability: "High",
            guidance: "Use an inquisitive phrase to support the tag's intent.",
            category: "vocalized-markup",
            providers: ["gemini", "elevenlabs"],
            warning: "Because the tag itself is spoken, this mode is likely an undesired side effect for most use cases. Prefer using the Style Prompt to set these emotional tones instead.",
        },
        {
            tag: "[bored]",
            behavior: "The word \"bored\" is spoken, and the sentence adopts a bored, monotone delivery.",
            reliability: "High",
            guidance: "Use with text that is mundane or repetitive for best effect.",
            category: "vocalized-markup",
            providers: ["gemini"],
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
            providers: ["gemini"],
        },
        {
            tag: "[medium pause]",
            behavior: "Inserts a standard pause, similar to a sentence break (~500ms).",
            reliability: "High",
            guidance: "Effective for separating distinct sentences or thoughts.",
            category: "pacing-pauses",
            providers: ["gemini"],
        },
        {
            tag: "[long pause]",
            behavior: "Inserts a significant pause for dramatic effect (~1000ms+).",
            reliability: "High",
            guidance: "Use for dramatic timing. For example: \"The answer is... [long pause] ...no.\" Avoid overuse, as it can sound unnatural.",
            category: "pacing-pauses",
            providers: ["gemini"],
        },
        {
            tag: "[pauses]",
            behavior: "Inserts a pause for dramatic effect or to let information sink in.",
            reliability: "High",
            guidance: "Use between major points or for dramatic effect. Always return to [normal voice] after pauses.",
            category: "pacing-pauses",
            providers: ["elevenlabs"],
        },
        {
            tag: "[stammers]",
            behavior: "Creates a stammering effect in speech.",
            reliability: "High",
            guidance: "Useful for expressing hesitation, nervousness, or uncertainty.",
            category: "pacing-pauses",
            providers: ["elevenlabs"],
        },
        {
            tag: "[rushed]",
            behavior: "Makes the speech sound rushed or hurried.",
            reliability: "High",
            guidance: "Useful for expressing urgency or time pressure.",
            category: "pacing-pauses",
            providers: ["elevenlabs"],
        },
    ],
    "voice-control": [
        {
            tag: "[normal voice]",
            behavior: "Returns the voice to normal/default delivery after using emotional or style tags.",
            reliability: "High",
            guidance: "Always return to [normal voice] after using an emotional tag. This is essential for maintaining natural flow.",
            category: "voice-control",
            providers: ["elevenlabs"],
        },
    ],
    "emotional": [
        {
            tag: "[happy]",
            behavior: "Adopts a happy, cheerful tone.",
            reliability: "High",
            guidance: "Use for positive, uplifting content. Always return to [normal voice] after.",
            category: "emotional",
            providers: ["elevenlabs"],
        },
        {
            tag: "[excited]",
            behavior: "Adopts an excited, enthusiastic tone.",
            reliability: "High",
            guidance: "Use for high-energy, enthusiastic moments. Great for intros and engaging content.",
            category: "emotional",
            providers: ["elevenlabs"],
        },
        {
            tag: "[sad]",
            behavior: "Adopts a sad, melancholic tone.",
            reliability: "High",
            guidance: "Use for emotional or somber content. Always return to [normal voice] after.",
            category: "emotional",
            providers: ["elevenlabs"],
        },
        {
            tag: "[angry]",
            behavior: "Adopts an angry, frustrated tone.",
            reliability: "High",
            guidance: "Use for expressing frustration or anger. Use sparingly and return to [normal voice] after.",
            category: "emotional",
            providers: ["elevenlabs"],
        },
        {
            tag: "[nervous]",
            behavior: "Adopts a nervous, anxious tone.",
            reliability: "High",
            guidance: "Use for expressing anxiety or uncertainty.",
            category: "emotional",
            providers: ["elevenlabs"],
        },
        {
            tag: "[mischievously]",
            behavior: "Adopts a mischievous, playful tone.",
            reliability: "High",
            guidance: "Use for playful, teasing, or slightly naughty content.",
            category: "emotional",
            providers: ["elevenlabs"],
        },
        {
            tag: "[annoyed]",
            behavior: "Adopts an annoyed, irritated tone.",
            reliability: "High",
            guidance: "Use for expressing mild frustration or irritation.",
            category: "emotional",
            providers: ["elevenlabs"],
        },
        {
            tag: "[appalled]",
            behavior: "Adopts an appalled, shocked tone.",
            reliability: "High",
            guidance: "Use for expressing strong disapproval or shock.",
            category: "emotional",
            providers: ["elevenlabs"],
        },
        {
            tag: "[thoughtful]",
            behavior: "Adopts a thoughtful, reflective tone.",
            reliability: "High",
            guidance: "Use for contemplative or reflective content. Great for outros.",
            category: "emotional",
            providers: ["elevenlabs"],
        },
        {
            tag: "[surprised]",
            behavior: "Adopts a surprised, shocked tone.",
            reliability: "High",
            guidance: "Use for expressing surprise or revelation moments.",
            category: "emotional",
            providers: ["elevenlabs"],
        },
    ],
    "volume-energy": [
        {
            tag: "[loudly]",
            behavior: "Increases the volume and energy of the speech.",
            reliability: "High",
            guidance: "Use for emphasis or high-energy moments. Always return to [normal voice] after.",
            category: "volume-energy",
            providers: ["elevenlabs"],
        },
        {
            tag: "[quietly]",
            behavior: "Decreases the volume of the speech.",
            reliability: "High",
            guidance: "Use for intimate or secretive moments. Always return to [normal voice] after.",
            category: "volume-energy",
            providers: ["elevenlabs"],
        },
    ],
    "narrative-control": [
        {
            tag: "[dramatic tone]",
            behavior: "Adopts a dramatic, theatrical tone.",
            reliability: "High",
            guidance: "Use for dramatic moments or storytelling. Always return to [normal voice] after.",
            category: "narrative-control",
            providers: ["elevenlabs"],
        },
        {
            tag: "[lighthearted]",
            behavior: "Adopts a lighthearted, cheerful tone.",
            reliability: "High",
            guidance: "Use for fun, casual content. Great for advertising segments.",
            category: "narrative-control",
            providers: ["elevenlabs"],
        },
        {
            tag: "[reflective]",
            behavior: "Adopts a reflective, contemplative tone.",
            reliability: "High",
            guidance: "Use for thoughtful or introspective content. Great for outros.",
            category: "narrative-control",
            providers: ["elevenlabs"],
        },
        {
            tag: "[sarcastic tone]",
            behavior: "Adopts a sarcastic, ironic tone.",
            reliability: "High",
            guidance: "Use for sarcastic or ironic content. Always return to [normal voice] after.",
            category: "narrative-control",
            providers: ["elevenlabs"],
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
 * Get tags by provider
 */
function getTagsByProvider(provider) {
    return exports.TTS_MARKUP_TAGS_LIST.filter((tag) => tag.providers.includes(provider));
}
/**
 * Get tags by category and provider
 */
function getTagsByCategoryAndProvider(category, provider) {
    return getTagsByCategory(category).filter((tag) => tag.providers.includes(provider));
}
/**
 * Search tags by tag name, behavior, or guidance
 */
function searchTags(query, provider) {
    const lowerQuery = query.toLowerCase();
    let results = exports.TTS_MARKUP_TAGS_LIST.filter((tag) => tag.tag.toLowerCase().includes(lowerQuery) ||
        tag.behavior.toLowerCase().includes(lowerQuery) ||
        tag.guidance.toLowerCase().includes(lowerQuery));
    if (provider) {
        results = results.filter((tag) => tag.providers.includes(provider));
    }
    return results;
}
/**
 * Get a tag by its tag string
 */
function getTagByTagString(tagString) {
    return exports.TTS_MARKUP_TAGS_MAP[tagString];
}
/**
 * Get all tags for a provider, grouped by category
 */
function getTagsByProviderGrouped(provider) {
    const grouped = {};
    for (const category of Object.keys(exports.TTS_MARKUP_TAGS)) {
        const tags = getTagsByCategoryAndProvider(category, provider);
        if (tags.length > 0) {
            grouped[category] = tags;
        }
    }
    return grouped;
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
    "voice-control": {
        id: "voice-control",
        name: "Voice Control",
        description: "Tags that control the voice state, such as returning to normal voice after using emotional or style tags.",
    },
    "emotional": {
        id: "emotional",
        name: "Emotional",
        description: "Tags that express emotions and feelings, such as happy, sad, excited, or thoughtful tones.",
    },
    "volume-energy": {
        id: "volume-energy",
        name: "Volume & Energy",
        description: "Tags that control the volume and energy level of the speech, such as loudly, quietly, or shouting.",
    },
    "narrative-control": {
        id: "narrative-control",
        name: "Narrative Control",
        description: "Tags that control the narrative style and tone, such as dramatic, lighthearted, reflective, or sarcastic.",
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