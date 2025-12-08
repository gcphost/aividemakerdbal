"use strict";
/**
 * Static configuration for all supported AI providers
 * This defines what services each provider supports and what credentials they require
 *
 * This is the single source of truth for AI provider configuration.
 * Used by app, socket-server, and website.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AI_PROVIDERS = void 0;
exports.getProviderIds = getProviderIds;
exports.getProviderConfig = getProviderConfig;
exports.getProvidersByCapability = getProvidersByCapability;
exports.isValidProvider = isValidProvider;
exports.getRequiredFields = getRequiredFields;
exports.providerSupports = providerSupports;
exports.getModelsForProvider = getModelsForProvider;
exports.getDefaultModel = getDefaultModel;
exports.isValidModel = isValidModel;
exports.getGenerationOptions = getGenerationOptions;
exports.getMaxPromptLength = getMaxPromptLength;
exports.getImageSizesForModel = getImageSizesForModel;
exports.getVideoOptionsForModel = getVideoOptionsForModel;
exports.getDefaultImageSize = getDefaultImageSize;
exports.getTTSOptionsForModel = getTTSOptionsForModel;
exports.getVoicesForModel = getVoicesForModel;
exports.getLanguagesForModel = getLanguagesForModel;
exports.getSpeedRangeForModel = getSpeedRangeForModel;
exports.modelSupportsInstructions = modelSupportsInstructions;
exports.getSupportedOptionsForModel = getSupportedOptionsForModel;
exports.getChunkDurationForProvider = getChunkDurationForProvider;
exports.getMusicOptionsForModel = getMusicOptionsForModel;
exports.getGenresForModel = getGenresForModel;
exports.getMoodsForModel = getMoodsForModel;
exports.getTemposForModel = getTemposForModel;
exports.getDurationRangeForModel = getDurationRangeForModel;
exports.getModelPricing = getModelPricing;
exports.getHardCodedDefaults = getHardCodedDefaults;
exports.AI_PROVIDERS = {
    openai: {
        id: "openai",
        name: "OpenAI",
        description: "Industry-leading AI for scripts, images, voice, and transcription",
        website: "https://openai.com",
        apiKeyUrl: "https://platform.openai.com/api-keys",
        capabilities: [
            "text-generation",
            "image-generation",
            "tts",
            "transcription",
            "video-generation",
            "embeddings",
        ],
        fields: [
            {
                name: "apiKey",
                label: "API Key",
                type: "password",
                required: true,
                description: "Your OpenAI API key (starts with sk-)",
            },
        ],
        notes: "Supports GPT-4, GPT-3.5, DALL-E 2/3, GPT-Image-1, OpenAI TTS, Whisper transcription, and Sora video generation",
        models: {
            "text-generation": [
                { id: "gpt-5.1", name: "GPT-5.1", description: "Latest flagship model", default: true },
                { id: "gpt-5", name: "GPT-5", description: "Next-gen flagship" },
                { id: "gpt-5-mini", name: "GPT-5 Mini", description: "Fast and affordable GPT-5" },
                { id: "gpt-4o", name: "GPT-4o", description: "Most capable GPT-4" },
                { id: "gpt-4o-mini", name: "GPT-4o Mini", description: "Fast and affordable" },
                { id: "gpt-4-turbo", name: "GPT-4 Turbo", description: "Previous generation" },
                { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo", description: "Fast, legacy model" },
            ],
            "image-generation": [
                {
                    id: "gpt-image-1",
                    name: "GPT-Image-1",
                    description: "Latest high-quality image generation model",
                    default: true,
                    pricing: { perUnitLow: 0.02, perUnitMedium: 0.07, perUnitHigh: 0.19 },
                },
                {
                    id: "gpt-image-1-mini",
                    name: "GPT-Image-1 Mini",
                    description: "Fast, lower cost image generation",
                    pricing: { perUnit: 0.02 },
                },
                {
                    id: "dall-e-3",
                    name: "DALL-E 3",
                    description: "High quality generations",
                    pricing: { perUnit: 0.04 },
                },
                {
                    id: "dall-e-2",
                    name: "DALL-E 2",
                    description: "Fast, lower cost",
                    pricing: { perUnit: 0.02 },
                },
            ],
            tts: [
                {
                    id: "tts-1",
                    name: "TTS-1",
                    description: "Standard quality",
                    default: true,
                    pricing: { perMillionCharacters: 15 },
                },
                {
                    id: "tts-1-hd",
                    name: "TTS-1 HD",
                    description: "High definition audio",
                    pricing: { perMillionCharacters: 30 },
                },
                {
                    id: "gpt-4o-mini-tts",
                    name: "GPT-4o Mini TTS",
                    description: "Advanced with voice instructions",
                    pricing: { perMillionCharacters: 15 },
                },
            ],
            transcription: [
                { id: "whisper-1", name: "Whisper", description: "Speech to text", default: true },
                {
                    id: "gpt-4o-transcribe",
                    name: "GPT-4o Transcribe",
                    description: "Advanced transcription",
                },
                {
                    id: "gpt-4o-mini-transcribe",
                    name: "GPT-4o Mini Transcribe",
                    description: "Fast transcription",
                },
            ],
            "video-generation": [
                {
                    id: "sora-2-pro",
                    name: "Sora 2 Pro",
                    description: "High-quality video generation",
                    default: true,
                    pricing: { perSecond: 0.1 },
                },
                {
                    id: "sora-2",
                    name: "Sora 2",
                    description: "Fast video generation",
                    pricing: { perSecond: 0.05 },
                },
            ],
            embeddings: [
                {
                    id: "text-embedding-3-large",
                    name: "Text Embedding 3 Large (1536 dims)",
                    description: "Most powerful but slower",
                    pricing: { perMillionCharacters: 13 },
                },
                {
                    id: "text-embedding-3-small",
                    name: "Text Embedding 3 Small (512 dims)",
                    description: "Faster and cheaper",
                    default: true,
                    pricing: { perMillionCharacters: 2 },
                },
                {
                    id: "text-embedding-ada-002",
                    name: "Text Embedding Ada 002 (1536 dims)",
                    description: "Legacy model",
                    pricing: { perMillionCharacters: 10 },
                },
            ],
        },
        generationOptions: {
            // GPT-Image-1 (gpt-image-1) - Latest model
            "gpt-image-1": {
                imageSizes: [
                    { width: 1024, height: 1024, label: "1024×1024 (1:1)", aspectRatio: "1:1" },
                    { width: 1536, height: 1024, label: "1536×1024 (3:2)", aspectRatio: "3:2" },
                    { width: 1024, height: 1536, label: "1024×1536 (2:3)", aspectRatio: "2:3" },
                ],
                supportedOptions: {
                    size: true,
                    quality: ["auto", "high", "medium", "low"],
                },
                maxPromptLength: 4000, // Same as DALL-E 3
            },
            // GPT-Image-1 Mini
            "gpt-image-1-mini": {
                imageSizes: [
                    { width: 1024, height: 1024, label: "1024×1024 (1:1)", aspectRatio: "1:1" },
                    { width: 1536, height: 1024, label: "1536×1024 (3:2)", aspectRatio: "3:2" },
                    { width: 1024, height: 1536, label: "1024×1536 (2:3)", aspectRatio: "2:3" },
                ],
                supportedOptions: {
                    size: true,
                    quality: ["auto", "high", "medium", "low"],
                },
                maxPromptLength: 4000, // Same as DALL-E 3
            },
            // DALL-E 3
            "dall-e-3": {
                imageSizes: [
                    { width: 1024, height: 1024, label: "1024×1024 (1:1)", aspectRatio: "1:1" },
                    { width: 1792, height: 1024, label: "1792×1024 (16:9)", aspectRatio: "16:9" },
                    { width: 1024, height: 1792, label: "1024×1792 (9:16)", aspectRatio: "9:16" },
                ],
                supportedOptions: {
                    size: true,
                    quality: ["auto", "hd", "standard"],
                    style: ["vivid", "natural"],
                },
                maxPromptLength: 4000, // DALL-E 3 has a maximum prompt length of ~4000 characters
            },
            // DALL-E 2
            "dall-e-2": {
                imageSizes: [
                    { width: 256, height: 256, label: "256×256 (1:1)", aspectRatio: "1:1" },
                    { width: 512, height: 512, label: "512×512 (1:1)", aspectRatio: "1:1" },
                    { width: 1024, height: 1024, label: "1024×1024 (1:1)", aspectRatio: "1:1" },
                ],
                supportedOptions: {
                    size: true,
                    quality: ["standard"],
                },
                maxPromptLength: 1000, // DALL-E 2 has a maximum prompt length of 1000 characters
            },
            // TTS models
            "tts-1": {
                ttsOptions: {
                    voices: [
                        {
                            id: "alloy",
                            name: "Alloy",
                            gender: "neutral",
                            previewUrl: "https://cdn.openai.com/API/docs/audio/alloy.wav",
                        },
                        {
                            id: "ash",
                            name: "Ash",
                            gender: "male",
                            previewUrl: "https://cdn.openai.com/API/docs/audio/ash.wav",
                        },
                        {
                            id: "ballad",
                            name: "Ballad",
                            gender: "male",
                            previewUrl: "https://cdn.openai.com/API/docs/audio/ballad.wav",
                        },
                        {
                            id: "coral",
                            name: "Coral",
                            gender: "female",
                            previewUrl: "https://cdn.openai.com/API/docs/audio/coral.wav",
                        },
                        {
                            id: "echo",
                            name: "Echo",
                            gender: "male",
                            previewUrl: "https://cdn.openai.com/API/docs/audio/echo.wav",
                        },
                        {
                            id: "fable",
                            name: "Fable",
                            gender: "neutral",
                            previewUrl: "https://cdn.openai.com/API/docs/audio/fable.wav",
                        },
                        {
                            id: "nova",
                            name: "Nova",
                            gender: "female",
                            previewUrl: "https://cdn.openai.com/API/docs/audio/nova.wav",
                        },
                        {
                            id: "onyx",
                            name: "Onyx",
                            gender: "male",
                            previewUrl: "https://cdn.openai.com/API/docs/audio/onyx.wav",
                        },
                        {
                            id: "sage",
                            name: "Sage",
                            gender: "female",
                            previewUrl: "https://cdn.openai.com/API/docs/audio/sage.wav",
                        },
                        {
                            id: "shimmer",
                            name: "Shimmer",
                            gender: "female",
                            previewUrl: "https://cdn.openai.com/API/docs/audio/shimmer.wav",
                        },
                        {
                            id: "verse",
                            name: "Verse",
                            gender: "male",
                            previewUrl: "https://cdn.openai.com/API/docs/audio/verse.wav",
                        },
                    ],
                    speedRange: { min: 0.25, max: 4.0, default: 1.0 },
                    chunkDurationSeconds: {
                        min: 5,
                        max: 300,
                        default: 30,
                        description: "OpenAI TTS supports up to 300 seconds (5 minutes) per chunk. Longer chunks may take more time to generate.",
                    },
                },
                maxPromptLength: 5000, // OpenAI TTS doesn't have a hard limit, but 5000 is a safe default for preview
            },
            // Sora 2 Pro - High quality
            "sora-2-pro": {
                videoOptions: {
                    resolutions: ["720p", "1080p"],
                    aspectRatios: ["16:9", "9:16", "1:1"],
                    maxDurationSeconds: 20,
                    supportedOptions: {
                        resolution: true,
                        aspectRatio: true,
                        duration: true,
                        inputReference: true,
                    },
                },
                maxPromptLength: 2000, // Sora supports longer prompts, but 2000 is reasonable for preview
            },
            // Sora 2 - Fast generation
            "sora-2": {
                videoOptions: {
                    resolutions: ["720p", "1080p"],
                    aspectRatios: ["16:9", "9:16", "1:1"],
                    maxDurationSeconds: 20,
                    supportedOptions: {
                        resolution: true,
                        aspectRatio: true,
                        duration: true,
                        inputReference: true,
                    },
                },
                maxPromptLength: 2000, // Sora supports longer prompts, but 2000 is reasonable for preview
            },
            "tts-1-hd": {
                ttsOptions: {
                    voices: [
                        {
                            id: "alloy",
                            name: "Alloy",
                            gender: "neutral",
                            previewUrl: "https://cdn.openai.com/API/docs/audio/alloy.wav",
                        },
                        {
                            id: "ash",
                            name: "Ash",
                            gender: "male",
                            previewUrl: "https://cdn.openai.com/API/docs/audio/ash.wav",
                        },
                        {
                            id: "ballad",
                            name: "Ballad",
                            gender: "male",
                            previewUrl: "https://cdn.openai.com/API/docs/audio/ballad.wav",
                        },
                        {
                            id: "coral",
                            name: "Coral",
                            gender: "female",
                            previewUrl: "https://cdn.openai.com/API/docs/audio/coral.wav",
                        },
                        {
                            id: "echo",
                            name: "Echo",
                            gender: "male",
                            previewUrl: "https://cdn.openai.com/API/docs/audio/echo.wav",
                        },
                        {
                            id: "fable",
                            name: "Fable",
                            gender: "neutral",
                            previewUrl: "https://cdn.openai.com/API/docs/audio/fable.wav",
                        },
                        {
                            id: "nova",
                            name: "Nova",
                            gender: "female",
                            previewUrl: "https://cdn.openai.com/API/docs/audio/nova.wav",
                        },
                        {
                            id: "onyx",
                            name: "Onyx",
                            gender: "male",
                            previewUrl: "https://cdn.openai.com/API/docs/audio/onyx.wav",
                        },
                        {
                            id: "sage",
                            name: "Sage",
                            gender: "female",
                            previewUrl: "https://cdn.openai.com/API/docs/audio/sage.wav",
                        },
                        {
                            id: "shimmer",
                            name: "Shimmer",
                            gender: "female",
                            previewUrl: "https://cdn.openai.com/API/docs/audio/shimmer.wav",
                        },
                        {
                            id: "verse",
                            name: "Verse",
                            gender: "male",
                            previewUrl: "https://cdn.openai.com/API/docs/audio/verse.wav",
                        },
                    ],
                    speedRange: { min: 0.25, max: 4.0, default: 1.0 },
                    supportedOptions: {
                        voice: true,
                        speed: true,
                        instructions: false, // tts-1-hd does not support instructions
                        emotionalTags: false,
                    },
                    chunkDurationSeconds: {
                        min: 5,
                        max: 300,
                        default: 30,
                        description: "OpenAI TTS supports up to 300 seconds (5 minutes) per chunk. Longer chunks may take more time to generate.",
                    },
                },
                maxPromptLength: 5000, // OpenAI TTS doesn't have a hard limit, but 5000 is a safe default for preview
            },
            "gpt-4o-mini-tts": {
                ttsOptions: {
                    voices: [
                        {
                            id: "alloy",
                            name: "Alloy",
                            gender: "neutral",
                            previewUrl: "https://cdn.openai.com/API/docs/audio/alloy.wav",
                        },
                        {
                            id: "ash",
                            name: "Ash",
                            gender: "male",
                            previewUrl: "https://cdn.openai.com/API/docs/audio/ash.wav",
                        },
                        {
                            id: "ballad",
                            name: "Ballad",
                            gender: "male",
                            previewUrl: "https://cdn.openai.com/API/docs/audio/ballad.wav",
                        },
                        {
                            id: "coral",
                            name: "Coral",
                            gender: "female",
                            previewUrl: "https://cdn.openai.com/API/docs/audio/coral.wav",
                        },
                        {
                            id: "echo",
                            name: "Echo",
                            gender: "male",
                            previewUrl: "https://cdn.openai.com/API/docs/audio/echo.wav",
                        },
                        {
                            id: "fable",
                            name: "Fable",
                            gender: "neutral",
                            previewUrl: "https://cdn.openai.com/API/docs/audio/fable.wav",
                        },
                        {
                            id: "nova",
                            name: "Nova",
                            gender: "female",
                            previewUrl: "https://cdn.openai.com/API/docs/audio/nova.wav",
                        },
                        {
                            id: "onyx",
                            name: "Onyx",
                            gender: "male",
                            previewUrl: "https://cdn.openai.com/API/docs/audio/onyx.wav",
                        },
                        {
                            id: "sage",
                            name: "Sage",
                            gender: "female",
                            previewUrl: "https://cdn.openai.com/API/docs/audio/sage.wav",
                        },
                        {
                            id: "shimmer",
                            name: "Shimmer",
                            gender: "female",
                            previewUrl: "https://cdn.openai.com/API/docs/audio/shimmer.wav",
                        },
                        {
                            id: "verse",
                            name: "Verse",
                            gender: "male",
                            previewUrl: "https://cdn.openai.com/API/docs/audio/verse.wav",
                        },
                    ],
                    speedRange: { min: 0.25, max: 4.0, default: 1.0 },
                    supportsInstructions: true,
                    supportedOptions: {
                        voice: true,
                        speed: true,
                        instructions: true,
                        emotionalTags: false,
                    },
                    chunkDurationSeconds: {
                        min: 5,
                        max: 300,
                        default: 30,
                        description: "OpenAI TTS supports up to 300 seconds (5 minutes) per chunk. Longer chunks may take more time to generate.",
                    },
                },
            },
        },
    },
    gemini: {
        id: "gemini",
        name: "Google Gemini",
        description: "Powerful multimodal AI with video generation, image generation and cloud TTS",
        website: "https://deepmind.google/technologies/gemini/",
        apiKeyUrl: "https://aistudio.google.com/app/apikey",
        capabilities: [
            "text-generation",
            "image-generation",
            "tts",
            "video-generation",
            "music-generation",
            "embeddings",
        ],
        fields: [
            {
                name: "apiKey",
                label: "API Key",
                type: "password",
                required: true,
                description: "Your Gemini API key from Google AI Studio (starts with AIza...)",
            },
            {
                name: "serviceAccountKey",
                label: "Service Account Key (JSON) - Optional, for TTS",
                type: "textarea",
                required: false,
                sensitive: true,
                description: "Paste your Google Cloud service account JSON key here (for Cloud TTS). Only needed if using Gemini for text-to-speech.",
            },
        ],
        notes: "Supports Gemini models, image generation, video generation, and music generation. TTS requires a Google Cloud service account with Cloud TTS API enabled.",
        models: {
            "text-generation": [
                {
                    id: "gemini-2.5-flash",
                    name: "Gemini 2.5 Flash",
                    description: "Best price-performance, large scale processing, low-latency, high volume tasks, agentic use cases",
                    default: true,
                },
                {
                    id: "gemini-3-pro-preview",
                    name: "Gemini 3 Pro",
                    description: "Best multimodal understanding, most powerful agentic and vibe-coding model, richer visuals and deeper interactivity, state-of-the-art reasoning",
                },
                {
                    id: "gemini-2.5-flash-lite",
                    name: "Gemini 2.5 Flash-Lite",
                    description: "Fastest flash model, cost-efficient, high throughput",
                },
                {
                    id: "gemini-2.5-pro",
                    name: "Gemini 2.5 Pro",
                    description: "State-of-the-art thinking model, reasoning over complex problems in code, math, STEM, analyzing large datasets, codebases, documents using long context",
                },
            ],
            "image-generation": [
                {
                    id: "imagen-4.0-generate-preview-06-06",
                    name: "Imagen 4.0",
                    description: "Latest Imagen model (Preview)",
                    default: true,
                    pricing: { perUnitStandard: 0.04, perUnitFast: 0.02, perUnitUltra: 0.06 },
                },
                {
                    id: "imagen-4.0-ultra-generate-preview-06-06",
                    name: "Imagen 4.0 Ultra",
                    description: "High quality Imagen 4 Ultra model",
                    pricing: { perUnit: 0.06 },
                },
                {
                    id: "gemini-2.5-flash-image",
                    name: "Gemini 2.5 Flash Image",
                    description: "Fast image generation with Gemini 2.5",
                    pricing: { perUnitStandard: 0.04, perUnitFast: 0.02, perUnitUltra: 0.06 },
                },
                {
                    id: "gemini-3-pro-image-preview",
                    name: "Gemini 3 Pro Image",
                    description: "Gemini 3 Pro image generation",
                    pricing: { perUnit: 0.04 },
                },
                {
                    id: "gemini-2.0-flash-exp-image-generation",
                    name: "Gemini 2.0 Flash Image (Exp)",
                    description: "Experimental Gemini 2.0 image generation",
                    pricing: { perUnit: 0.02 },
                },
            ],
            "video-generation": [
                {
                    id: "veo-3.1-generate",
                    name: "Veo 3.1",
                    description: "Latest video model",
                    default: true,
                    pricing: { perSecond: 0.12 },
                },
                {
                    id: "veo-3.1-fast-generate",
                    name: "Veo 3.1 Fast",
                    description: "Fast video generation",
                    pricing: { perSecond: 0.08 },
                },
                {
                    id: "veo-3.1-fast-generate-preview",
                    name: "Veo 3.1 Fast Preview",
                    description: "Preview model",
                    pricing: { perSecond: 0.08 },
                },
                {
                    id: "veo-2.1-generate",
                    name: "Veo 2.1",
                    description: "Previous generation",
                    pricing: { perSecond: 0.1 },
                },
                {
                    id: "veo-2.0-generate",
                    name: "Veo 2.0",
                    description: "Stable release",
                    pricing: { perSecond: 0.1 },
                },
            ],
            tts: [
                {
                    id: "chirp3-hd",
                    name: "Chirp 3: HD",
                    description: "Latest generation HD voices with emotional resonance",
                    default: true,
                    pricing: { perMillionCharacters: 16 },
                },
                {
                    id: "gemini-2.5-flash-tts",
                    name: "Gemini 2.5 Flash TTS",
                    description: "Fast Gemini 2.5 Flash text-to-speech",
                    pricing: { perMillionCharacters: 16 },
                },
                {
                    id: "gemini-2.5-pro-tts",
                    name: "Gemini 2.5 Pro TTS",
                    description: "High-quality Gemini 2.5 Pro text-to-speech",
                    pricing: { perMillionCharacters: 16 },
                },
                {
                    id: "gemini-2.5-flash-lite-preview-tts",
                    name: "Gemini 2.5 Flash Lite TTS (Preview)",
                    description: "Lightweight preview Gemini 2.5 Flash TTS",
                    pricing: { perMillionCharacters: 16 },
                },
                {
                    id: "google-cloud-tts",
                    name: "Google Cloud TTS",
                    description: "Standard high quality voices",
                    pricing: { perMillionCharacters: 16 },
                },
            ],
            "music-generation": [
                {
                    id: "lyria-realtime-exp",
                    name: "Lyria RealTime (Experimental)",
                    description: "Real-time music generation with BPM control",
                    default: true,
                    pricing: { perSecond: 0.03 },
                },
            ],
            embeddings: [
                {
                    id: "text-embedding-004",
                    name: "Text Embedding 004",
                    description: "Latest Gemini embedding model",
                    default: true,
                    pricing: { perMillionCharacters: 0.025 },
                },
                {
                    id: "text-embedding-preview-0814",
                    name: "Text Embedding Preview (0814)",
                    description: "Preview model",
                    pricing: { perMillionCharacters: 0.025 },
                },
            ],
        },
        generationOptions: {
            // Imagen 4.0 - Latest Imagen model
            "imagen-4.0-generate-preview-06-06": {
                imageSizes: [
                    { width: 1024, height: 1024, label: "1024×1024 (1:1)", aspectRatio: "1:1" },
                    { width: 1536, height: 1024, label: "1536×1024 (3:2)", aspectRatio: "3:2" },
                    { width: 1024, height: 1536, label: "1024×1536 (2:3)", aspectRatio: "2:3" },
                    { width: 1792, height: 1024, label: "1792×1024 (16:9)", aspectRatio: "16:9" },
                    { width: 1024, height: 1792, label: "1024×1792 (9:16)", aspectRatio: "9:16" },
                ],
                supportedOptions: {
                    size: true,
                    aspectRatio: true,
                    personGeneration: true,
                },
                maxPromptLength: 4000, // Imagen models support longer prompts, 4000 is a safe default
            },
            // Imagen 4.0 Ultra
            "imagen-4.0-ultra-generate-preview-06-06": {
                imageSizes: [
                    { width: 1024, height: 1024, label: "1024×1024 (1:1)", aspectRatio: "1:1" },
                    { width: 1536, height: 1024, label: "1536×1024 (3:2)", aspectRatio: "3:2" },
                    { width: 1024, height: 1536, label: "1024×1536 (2:3)", aspectRatio: "2:3" },
                    { width: 1792, height: 1024, label: "1792×1024 (16:9)", aspectRatio: "16:9" },
                    { width: 1024, height: 1792, label: "1024×1792 (9:16)", aspectRatio: "9:16" },
                ],
                supportedOptions: {
                    size: true,
                    aspectRatio: true,
                    personGeneration: true,
                },
                maxPromptLength: 4000, // Imagen models support longer prompts, 4000 is a safe default
            },
            // Gemini 2.5 Flash Image
            "gemini-2.5-flash-image": {
                imageSizes: [
                    { width: 1024, height: 1024, label: "1024×1024 (1:1)", aspectRatio: "1:1" },
                    { width: 1536, height: 1024, label: "1536×1024 (3:2)", aspectRatio: "3:2" },
                    { width: 1024, height: 1536, label: "1024×1536 (2:3)", aspectRatio: "2:3" },
                    { width: 1792, height: 1024, label: "1792×1024 (16:9)", aspectRatio: "16:9" },
                    { width: 1024, height: 1792, label: "1024×1792 (9:16)", aspectRatio: "9:16" },
                ],
                supportedOptions: {
                    size: true, // Supports 1K and 2K
                    aspectRatio: true,
                },
                maxPromptLength: 4000, // Gemini image models support longer prompts, 4000 is a safe default
            },
            // Gemini 3 Pro Image
            "gemini-3-pro-image-preview": {
                imageSizes: [
                    { width: 1024, height: 1024, label: "1024×1024 (1:1)", aspectRatio: "1:1" },
                    { width: 1536, height: 1024, label: "1536×1024 (3:2)", aspectRatio: "3:2" },
                    { width: 1024, height: 1536, label: "1024×1536 (2:3)", aspectRatio: "2:3" },
                    { width: 1792, height: 1024, label: "1792×1024 (16:9)", aspectRatio: "16:9" },
                    { width: 1024, height: 1792, label: "1024×1792 (9:16)", aspectRatio: "9:16" },
                ],
                supportedOptions: {
                    size: true, // Supports 1K, 2K, and 4K
                    aspectRatio: true,
                },
                maxPromptLength: 4000, // Gemini image models support longer prompts, 4000 is a safe default
            },
            // Gemini 2.0 Flash Image (Experimental)
            "gemini-2.0-flash-exp-image-generation": {
                imageSizes: [
                    { width: 1024, height: 1024, label: "1024×1024 (1:1)", aspectRatio: "1:1" },
                    { width: 1536, height: 1024, label: "1536×1024 (3:2)", aspectRatio: "3:2" },
                    { width: 1024, height: 1536, label: "1024×1536 (2:3)", aspectRatio: "2:3" },
                ],
                maxPromptLength: 4000, // Gemini image models support longer prompts, 4000 is a safe default
            },
            // Veo 3.1 - Latest video model
            "veo-3.1-generate": {
                videoOptions: {
                    resolutions: ["720p", "1080p"],
                    aspectRatios: ["16:9", "9:16", "1:1"],
                    maxDurationSeconds: 8,
                    durations: [4, 6, 8], // Gemini Veo models support specific duration values
                    supportedOptions: {
                        resolution: true,
                        aspectRatio: true,
                        duration: [4, 6, 8], // Specific duration values
                        firstFrame: true,
                        lastFrame: true,
                    },
                },
                maxPromptLength: 2000, // Veo supports longer prompts, but 2000 is reasonable for preview
            },
            // Veo 3.1 Fast
            "veo-3.1-fast-generate": {
                videoOptions: {
                    resolutions: ["720p", "1080p"],
                    aspectRatios: ["16:9", "9:16", "1:1"],
                    maxDurationSeconds: 8,
                    durations: [4, 6, 8], // Gemini Veo models support specific duration values
                    supportedOptions: {
                        resolution: true,
                        aspectRatio: true,
                        duration: [4, 6, 8],
                        firstFrame: true,
                        lastFrame: true,
                    },
                },
                maxPromptLength: 2000, // Veo supports longer prompts, but 2000 is reasonable for preview
            },
            // Veo 3.1 Fast Preview
            "veo-3.1-fast-generate-preview": {
                videoOptions: {
                    resolutions: ["720p", "1080p"],
                    aspectRatios: ["16:9", "9:16", "1:1"],
                    maxDurationSeconds: 8,
                    durations: [4, 6, 8], // Gemini Veo models support specific duration values
                    supportedOptions: {
                        resolution: true,
                        aspectRatio: true,
                        duration: [4, 6, 8],
                        firstFrame: true,
                        lastFrame: true,
                    },
                },
                maxPromptLength: 2000, // Veo supports longer prompts, but 2000 is reasonable for preview
            },
            // Veo 2.1
            "veo-2.1-generate": {
                videoOptions: {
                    resolutions: ["720p"],
                    aspectRatios: ["16:9", "9:16"],
                    maxDurationSeconds: 8,
                    durations: [4, 6, 8], // Gemini Veo models support specific duration values
                    supportedOptions: {
                        resolution: true,
                        aspectRatio: true,
                        duration: [4, 6, 8],
                        firstFrame: true,
                        lastFrame: true,
                    },
                },
                maxPromptLength: 2000, // Veo supports longer prompts, but 2000 is reasonable for preview
            },
            // Veo 2.0
            "veo-2.0-generate": {
                videoOptions: {
                    resolutions: ["720p"],
                    aspectRatios: ["16:9", "9:16"],
                    maxDurationSeconds: 8,
                    durations: [4, 6, 8], // Gemini Veo models support specific duration values
                    supportedOptions: {
                        resolution: true,
                        aspectRatio: true,
                        duration: [4, 6, 8],
                        firstFrame: true,
                        lastFrame: true,
                    },
                },
                maxPromptLength: 2000, // Veo supports longer prompts, but 2000 is reasonable for preview
            },
            // Chirp 3: HD - Latest generation HD voices
            "chirp3-hd": {
                ttsOptions: {
                    voices: [
                        {
                            id: "Achernar",
                            name: "Achernar",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-achernar.wav",
                        },
                        {
                            id: "Achird",
                            name: "Achird",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-achird.wav",
                        },
                        {
                            id: "Algenib",
                            name: "Algenib",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-algenib.wav",
                        },
                        {
                            id: "Algieba",
                            name: "Algieba",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-algieba.wav",
                        },
                        {
                            id: "Alnilam",
                            name: "Alnilam",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-alnilam.wav",
                        },
                        {
                            id: "Aoede",
                            name: "Aoede",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-aoede.wav",
                        },
                        {
                            id: "Autonoe",
                            name: "Autonoe",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-autonoe.wav",
                        },
                        {
                            id: "Callirrhoe",
                            name: "Callirrhoe",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-callirrhoe.wav",
                        },
                        {
                            id: "Charon",
                            name: "Charon",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-charon.wav",
                        },
                        {
                            id: "Despina",
                            name: "Despina",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-despina.wav",
                        },
                        {
                            id: "Enceladus",
                            name: "Enceladus",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-enceladus.wav",
                        },
                        {
                            id: "Erinome",
                            name: "Erinome",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-erinome.wav",
                        },
                        {
                            id: "Fenrir",
                            name: "Fenrir",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-fenrir.wav",
                        },
                        {
                            id: "Gacrux",
                            name: "Gacrux",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-gacrux.wav",
                        },
                        {
                            id: "Iapetus",
                            name: "Iapetus",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-iapetus.wav",
                        },
                        {
                            id: "Kore",
                            name: "Kore",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-kore.wav",
                        },
                        {
                            id: "Laomedeia",
                            name: "Laomedeia",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-laomedeia.wav",
                        },
                        {
                            id: "Leda",
                            name: "Leda",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-leda.wav",
                        },
                        {
                            id: "Orus",
                            name: "Orus",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-orus.wav",
                        },
                        {
                            id: "Puck",
                            name: "Puck",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-puck.wav",
                        },
                        {
                            id: "Pulcherrima",
                            name: "Pulcherrima",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-pulcherrima.wav",
                        },
                        {
                            id: "Rasalgethi",
                            name: "Rasalgethi",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-rasalgethi.wav",
                        },
                        {
                            id: "Sadachbia",
                            name: "Sadachbia",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-sadachbia.wav",
                        },
                        {
                            id: "Sadaltager",
                            name: "Sadaltager",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-sadaltager.wav",
                        },
                        {
                            id: "Schedar",
                            name: "Schedar",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-schedar.wav",
                        },
                        {
                            id: "Sulafat",
                            name: "Sulafat",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-sulafat.wav",
                        },
                        {
                            id: "Umbriel",
                            name: "Umbriel",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-umbriel.wav",
                        },
                        {
                            id: "Vindemiatrix",
                            name: "Vindemiatrix",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-vindemiatrix.wav",
                        },
                        {
                            id: "Zephyr",
                            name: "Zephyr",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-zephyr.wav",
                        },
                        {
                            id: "Zubenelgenubi",
                            name: "Zubenelgenubi",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-zubenelgenubi.wav",
                        },
                    ],
                    languages: [
                        { code: "ar-XA", name: "Arabic (Generic)" },
                        { code: "bg-BG", name: "Bulgarian (Bulgaria)" },
                        { code: "bn-IN", name: "Bengali (India)" },
                        { code: "cmn-CN", name: "Mandarin Chinese (China)" },
                        { code: "cs-CZ", name: "Czech (Czech Republic)" },
                        { code: "da-DK", name: "Danish (Denmark)" },
                        { code: "de-DE", name: "German (Germany)" },
                        { code: "el-GR", name: "Greek (Greece)" },
                        { code: "en-AU", name: "English (Australia)" },
                        { code: "en-GB", name: "English (United Kingdom)" },
                        { code: "en-IN", name: "English (India)" },
                        { code: "en-US", name: "English (United States)" },
                        { code: "es-ES", name: "Spanish (Spain)" },
                        { code: "es-US", name: "Spanish (United States)" },
                        { code: "et-EE", name: "Estonian (Estonia)" },
                        { code: "fi-FI", name: "Finnish (Finland)" },
                        { code: "fr-CA", name: "French (Canada)" },
                        { code: "fr-FR", name: "French (France)" },
                        { code: "gu-IN", name: "Gujarati (India)" },
                        { code: "he-IL", name: "Hebrew (Israel)" },
                        { code: "hi-IN", name: "Hindi (India)" },
                        { code: "hr-HR", name: "Croatian (Croatia)" },
                        { code: "hu-HU", name: "Hungarian (Hungary)" },
                        { code: "id-ID", name: "Indonesian (Indonesia)" },
                        { code: "it-IT", name: "Italian (Italy)" },
                        { code: "ja-JP", name: "Japanese (Japan)" },
                        { code: "kn-IN", name: "Kannada (India)" },
                        { code: "ko-KR", name: "Korean (South Korea)" },
                        { code: "lt-LT", name: "Lithuanian (Lithuania)" },
                        { code: "lv-LV", name: "Latvian (Latvia)" },
                        { code: "ml-IN", name: "Malayalam (India)" },
                        { code: "mr-IN", name: "Marathi (India)" },
                        { code: "nb-NO", name: "Norwegian Bokmål (Norway)" },
                        { code: "nl-BE", name: "Dutch (Belgium)" },
                        { code: "nl-NL", name: "Dutch (Netherlands)" },
                        { code: "pl-PL", name: "Polish (Poland)" },
                        { code: "pt-BR", name: "Portuguese (Brazil)" },
                        { code: "ro-RO", name: "Romanian (Romania)" },
                        { code: "ru-RU", name: "Russian (Russia)" },
                        { code: "sk-SK", name: "Slovak (Slovakia)" },
                        { code: "sl-SI", name: "Slovenian (Slovenia)" },
                        { code: "sr-RS", name: "Serbian (Cyrillic)" },
                        { code: "sv-SE", name: "Swedish (Sweden)" },
                        { code: "sw-KE", name: "Swahili (Kenya)" },
                        { code: "ta-IN", name: "Tamil (India)" },
                        { code: "te-IN", name: "Telugu (India)" },
                        { code: "th-TH", name: "Thai (Thailand)" },
                        { code: "tr-TR", name: "Turkish (Turkey)" },
                        { code: "uk-UA", name: "Ukrainian (Ukraine)" },
                        { code: "ur-IN", name: "Urdu (India)" },
                        { code: "vi-VN", name: "Vietnamese (Vietnam)" },
                    ],
                    speedRange: { min: 0.25, max: 4.0, default: 1.0 },
                    supportsInstructions: true,
                    supportedOptions: {
                        voice: true,
                        language: true,
                        speed: true,
                        instructions: true,
                        emotionalTags: true, // chirp3-hd supports emotional tags
                        pitch: true,
                        volume: true,
                    },
                    chunkDurationSeconds: {
                        min: 5,
                        max: 300,
                        default: 30,
                        description: "Gemini TTS supports up to 300 seconds (5 minutes) per chunk. Longer chunks may take more time to generate.",
                    },
                },
                maxPromptLength: 5000, // Gemini TTS doesn't have a hard limit, but 5000 is a safe default for preview
            },
            // Google Cloud TTS (Legacy standard voices)
            "google-cloud-tts": {
                ttsOptions: {
                    voices: [
                        {
                            id: "1",
                            name: "1",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-1.wav",
                        },
                        {
                            id: "A",
                            name: "A",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-a.wav",
                        },
                        {
                            id: "Achernar",
                            name: "Achernar",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-achernar.wav",
                        },
                        {
                            id: "Achird",
                            name: "Achird",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-achird.wav",
                        },
                        {
                            id: "Algenib",
                            name: "Algenib",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-algenib.wav",
                        },
                        {
                            id: "Algieba",
                            name: "Algieba",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-algieba.wav",
                        },
                        {
                            id: "Alnilam",
                            name: "Alnilam",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-alnilam.wav",
                        },
                        {
                            id: "Aoede",
                            name: "Aoede",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-aoede.wav",
                        },
                        {
                            id: "Autonoe",
                            name: "Autonoe",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-autonoe.wav",
                        },
                        {
                            id: "B",
                            name: "B",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-b.wav",
                        },
                        {
                            id: "C",
                            name: "C",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-c.wav",
                        },
                        {
                            id: "Callirrhoe",
                            name: "Callirrhoe",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-callirrhoe.wav",
                        },
                        {
                            id: "Charon",
                            name: "Charon",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-charon.wav",
                        },
                        {
                            id: "D",
                            name: "D",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-d.wav",
                        },
                        {
                            id: "Despina",
                            name: "Despina",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-despina.wav",
                        },
                        {
                            id: "E",
                            name: "E",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-e.wav",
                        },
                        {
                            id: "Enceladus",
                            name: "Enceladus",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-enceladus.wav",
                        },
                        {
                            id: "Erinome",
                            name: "Erinome",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-erinome.wav",
                        },
                        {
                            id: "F",
                            name: "F",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-f.wav",
                        },
                        {
                            id: "Fenrir",
                            name: "Fenrir",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-fenrir.wav",
                        },
                        {
                            id: "G",
                            name: "G",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-g.wav",
                        },
                        {
                            id: "Gacrux",
                            name: "Gacrux",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-gacrux.wav",
                        },
                        {
                            id: "H",
                            name: "H",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-h.wav",
                        },
                        {
                            id: "I",
                            name: "I",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-i.wav",
                        },
                        {
                            id: "Iapetus",
                            name: "Iapetus",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-iapetus.wav",
                        },
                        {
                            id: "J",
                            name: "J",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-j.wav",
                        },
                        {
                            id: "K",
                            name: "K",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-k.wav",
                        },
                        {
                            id: "Kore",
                            name: "Kore",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-kore.wav",
                        },
                        {
                            id: "L",
                            name: "L",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-l.wav",
                        },
                        {
                            id: "Laomedeia",
                            name: "Laomedeia",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-laomedeia.wav",
                        },
                        {
                            id: "Leda",
                            name: "Leda",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-leda.wav",
                        },
                        {
                            id: "M",
                            name: "M",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-m.wav",
                        },
                        {
                            id: "N",
                            name: "N",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-n.wav",
                        },
                        {
                            id: "O",
                            name: "O",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-o.wav",
                        },
                        {
                            id: "Orus",
                            name: "Orus",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-orus.wav",
                        },
                        {
                            id: "Puck",
                            name: "Puck",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-puck.wav",
                        },
                        {
                            id: "Pulcherrima",
                            name: "Pulcherrima",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-pulcherrima.wav",
                        },
                        {
                            id: "Q",
                            name: "Q",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-q.wav",
                        },
                        {
                            id: "Rasalgethi",
                            name: "Rasalgethi",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-rasalgethi.wav",
                        },
                        {
                            id: "Sadachbia",
                            name: "Sadachbia",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-sadachbia.wav",
                        },
                        {
                            id: "Sadaltager",
                            name: "Sadaltager",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-sadaltager.wav",
                        },
                        {
                            id: "Schedar",
                            name: "Schedar",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-schedar.wav",
                        },
                        {
                            id: "Sulafat",
                            name: "Sulafat",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-sulafat.wav",
                        },
                        {
                            id: "Umbriel",
                            name: "Umbriel",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-umbriel.wav",
                        },
                        {
                            id: "Vindemiatrix",
                            name: "Vindemiatrix",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-vindemiatrix.wav",
                        },
                        {
                            id: "Zephyr",
                            name: "Zephyr",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-zephyr.wav",
                        },
                        {
                            id: "Zubenelgenubi",
                            name: "Zubenelgenubi",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-zubenelgenubi.wav",
                        },
                    ],
                    languages: [
                        { code: "af-ZA", name: "af-ZA" },
                        { code: "am-ET", name: "am-ET" },
                        { code: "ar-XA", name: "Arabic (Generic)" },
                        { code: "bg-BG", name: "Bulgarian (Bulgaria)" },
                        { code: "bn-IN", name: "Bengali (India)" },
                        { code: "ca-ES", name: "ca-ES" },
                        { code: "cmn-CN", name: "Mandarin Chinese (China)" },
                        { code: "cmn-TW", name: "cmn-TW" },
                        { code: "cs-CZ", name: "Czech (Czech Republic)" },
                        { code: "da-DK", name: "Danish (Denmark)" },
                        { code: "de-DE", name: "German (Germany)" },
                        { code: "el-GR", name: "Greek (Greece)" },
                        { code: "en-AU", name: "English (Australia)" },
                        { code: "en-GB", name: "English (United Kingdom)" },
                        { code: "en-IN", name: "English (India)" },
                        { code: "en-US", name: "English (United States)" },
                        { code: "es-ES", name: "Spanish (Spain)" },
                        { code: "es-US", name: "Spanish (United States)" },
                        { code: "et-EE", name: "Estonian (Estonia)" },
                        { code: "eu-ES", name: "eu-ES" },
                        { code: "fi-FI", name: "Finnish (Finland)" },
                        { code: "fil-PH", name: "fil-PH" },
                        { code: "fr-CA", name: "French (Canada)" },
                        { code: "fr-FR", name: "French (France)" },
                        { code: "gl-ES", name: "gl-ES" },
                        { code: "gu-IN", name: "Gujarati (India)" },
                        { code: "he-IL", name: "Hebrew (Israel)" },
                        { code: "hi-IN", name: "Hindi (India)" },
                        { code: "hu-HU", name: "Hungarian (Hungary)" },
                        { code: "id-ID", name: "Indonesian (Indonesia)" },
                        { code: "is-IS", name: "is-IS" },
                        { code: "it-IT", name: "Italian (Italy)" },
                        { code: "ja-JP", name: "Japanese (Japan)" },
                        { code: "kn-IN", name: "Kannada (India)" },
                        { code: "ko-KR", name: "Korean (South Korea)" },
                        { code: "lt-LT", name: "Lithuanian (Lithuania)" },
                        { code: "lv-LV", name: "Latvian (Latvia)" },
                        { code: "ml-IN", name: "Malayalam (India)" },
                        { code: "mr-IN", name: "Marathi (India)" },
                        { code: "ms-MY", name: "ms-MY" },
                        { code: "nb-NO", name: "Norwegian Bokmål (Norway)" },
                        { code: "nl-BE", name: "Dutch (Belgium)" },
                        { code: "nl-NL", name: "Dutch (Netherlands)" },
                        { code: "pa-IN", name: "pa-IN" },
                        { code: "pl-PL", name: "Polish (Poland)" },
                        { code: "pt-BR", name: "Portuguese (Brazil)" },
                        { code: "pt-PT", name: "pt-PT" },
                        { code: "ro-RO", name: "Romanian (Romania)" },
                        { code: "ru-RU", name: "Russian (Russia)" },
                        { code: "sk-SK", name: "Slovak (Slovakia)" },
                        { code: "sr-RS", name: "Serbian (Cyrillic)" },
                        { code: "sv-SE", name: "Swedish (Sweden)" },
                        { code: "ta-IN", name: "Tamil (India)" },
                        { code: "te-IN", name: "Telugu (India)" },
                        { code: "th-TH", name: "Thai (Thailand)" },
                        { code: "tr-TR", name: "Turkish (Turkey)" },
                        { code: "uk-UA", name: "Ukrainian (Ukraine)" },
                        { code: "ur-IN", name: "Urdu (India)" },
                        { code: "vi-VN", name: "Vietnamese (Vietnam)" },
                        { code: "yue-HK", name: "yue-HK" },
                    ],
                    speedRange: { min: 0.25, max: 4.0, default: 1.0 },
                    supportedOptions: {
                        voice: true,
                        language: true,
                        speed: true,
                        instructions: false,
                        emotionalTags: false,
                        pitch: false,
                        volume: false,
                    },
                    chunkDurationSeconds: {
                        min: 5,
                        max: 300,
                        default: 30,
                        description: "Google Cloud TTS supports up to 300 seconds (5 minutes) per chunk.",
                    },
                },
            },
            // Gemini native TTS (uses Gemini model voices)
            "gemini-2.5-flash-tts": {
                ttsOptions: {
                    voices: [
                        {
                            id: "Achernar",
                            name: "Achernar",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-achernar.wav",
                        },
                        {
                            id: "Achird",
                            name: "Achird",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-achird.wav",
                        },
                        {
                            id: "Algenib",
                            name: "Algenib",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-algenib.wav",
                        },
                        {
                            id: "Algieba",
                            name: "Algieba",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-algieba.wav",
                        },
                        {
                            id: "Alnilam",
                            name: "Alnilam",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-alnilam.wav",
                        },
                        {
                            id: "Aoede",
                            name: "Aoede",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-aoede.wav",
                        },
                        {
                            id: "Autonoe",
                            name: "Autonoe",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-autonoe.wav",
                        },
                        {
                            id: "Callirrhoe",
                            name: "Callirrhoe",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-callirrhoe.wav",
                        },
                        {
                            id: "Charon",
                            name: "Charon",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-charon.wav",
                        },
                        {
                            id: "Despina",
                            name: "Despina",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-despina.wav",
                        },
                        {
                            id: "Enceladus",
                            name: "Enceladus",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-enceladus.wav",
                        },
                        {
                            id: "Erinome",
                            name: "Erinome",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-erinome.wav",
                        },
                        {
                            id: "Fenrir",
                            name: "Fenrir",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-fenrir.wav",
                        },
                        {
                            id: "Gacrux",
                            name: "Gacrux",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-gacrux.wav",
                        },
                        {
                            id: "Iapetus",
                            name: "Iapetus",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-iapetus.wav",
                        },
                        {
                            id: "Kore",
                            name: "Kore",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-kore.wav",
                        },
                        {
                            id: "Laomedeia",
                            name: "Laomedeia",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-laomedeia.wav",
                        },
                        {
                            id: "Leda",
                            name: "Leda",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-leda.wav",
                        },
                        {
                            id: "Orus",
                            name: "Orus",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-orus.wav",
                        },
                        {
                            id: "Puck",
                            name: "Puck",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-puck.wav",
                        },
                        {
                            id: "Pulcherrima",
                            name: "Pulcherrima",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-pulcherrima.wav",
                        },
                        {
                            id: "Rasalgethi",
                            name: "Rasalgethi",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-rasalgethi.wav",
                        },
                        {
                            id: "Sadachbia",
                            name: "Sadachbia",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-sadachbia.wav",
                        },
                        {
                            id: "Sadaltager",
                            name: "Sadaltager",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-sadaltager.wav",
                        },
                        {
                            id: "Schedar",
                            name: "Schedar",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-schedar.wav",
                        },
                        {
                            id: "Sulafat",
                            name: "Sulafat",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-sulafat.wav",
                        },
                        {
                            id: "Umbriel",
                            name: "Umbriel",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-umbriel.wav",
                        },
                        {
                            id: "Vindemiatrix",
                            name: "Vindemiatrix",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-vindemiatrix.wav",
                        },
                        {
                            id: "Zephyr",
                            name: "Zephyr",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-zephyr.wav",
                        },
                        {
                            id: "Zubenelgenubi",
                            name: "Zubenelgenubi",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-zubenelgenubi.wav",
                        },
                    ],
                    languages: [
                        { code: "ar-XA", name: "Arabic (Generic)" },
                        { code: "bg-BG", name: "Bulgarian (Bulgaria)" },
                        { code: "bn-IN", name: "Bengali (India)" },
                        { code: "cmn-CN", name: "Mandarin Chinese (China)" },
                        { code: "cs-CZ", name: "Czech (Czech Republic)" },
                        { code: "da-DK", name: "Danish (Denmark)" },
                        { code: "de-DE", name: "German (Germany)" },
                        { code: "el-GR", name: "Greek (Greece)" },
                        { code: "en-AU", name: "English (Australia)" },
                        { code: "en-GB", name: "English (United Kingdom)" },
                        { code: "en-IN", name: "English (India)" },
                        { code: "en-US", name: "English (United States)" },
                        { code: "es-ES", name: "Spanish (Spain)" },
                        { code: "es-US", name: "Spanish (United States)" },
                        { code: "et-EE", name: "Estonian (Estonia)" },
                        { code: "fi-FI", name: "Finnish (Finland)" },
                        { code: "fr-CA", name: "French (Canada)" },
                        { code: "fr-FR", name: "French (France)" },
                        { code: "gu-IN", name: "Gujarati (India)" },
                        { code: "he-IL", name: "Hebrew (Israel)" },
                        { code: "hi-IN", name: "Hindi (India)" },
                        { code: "hr-HR", name: "Croatian (Croatia)" },
                        { code: "hu-HU", name: "Hungarian (Hungary)" },
                        { code: "id-ID", name: "Indonesian (Indonesia)" },
                        { code: "it-IT", name: "Italian (Italy)" },
                        { code: "ja-JP", name: "Japanese (Japan)" },
                        { code: "kn-IN", name: "Kannada (India)" },
                        { code: "ko-KR", name: "Korean (South Korea)" },
                        { code: "lt-LT", name: "Lithuanian (Lithuania)" },
                        { code: "lv-LV", name: "Latvian (Latvia)" },
                        { code: "ml-IN", name: "Malayalam (India)" },
                        { code: "mr-IN", name: "Marathi (India)" },
                        { code: "nb-NO", name: "Norwegian Bokmål (Norway)" },
                        { code: "nl-BE", name: "Dutch (Belgium)" },
                        { code: "nl-NL", name: "Dutch (Netherlands)" },
                        { code: "pl-PL", name: "Polish (Poland)" },
                        { code: "pt-BR", name: "Portuguese (Brazil)" },
                        { code: "ro-RO", name: "Romanian (Romania)" },
                        { code: "ru-RU", name: "Russian (Russia)" },
                        { code: "sk-SK", name: "Slovak (Slovakia)" },
                        { code: "sl-SI", name: "Slovenian (Slovenia)" },
                        { code: "sr-RS", name: "Serbian (Cyrillic)" },
                        { code: "sv-SE", name: "Swedish (Sweden)" },
                        { code: "sw-KE", name: "Swahili (Kenya)" },
                        { code: "ta-IN", name: "Tamil (India)" },
                        { code: "te-IN", name: "Telugu (India)" },
                        { code: "th-TH", name: "Thai (Thailand)" },
                        { code: "tr-TR", name: "Turkish (Turkey)" },
                        { code: "uk-UA", name: "Ukrainian (Ukraine)" },
                        { code: "ur-IN", name: "Urdu (India)" },
                        { code: "vi-VN", name: "Vietnamese (Vietnam)" },
                    ],
                    speedRange: { min: 0.25, max: 4.0, default: 1.0 },
                    supportsInstructions: true,
                    supportedOptions: {
                        voice: true,
                        language: true,
                        speed: true,
                        instructions: true,
                        emotionalTags: false, // gemini-2.5-flash-tts does not support emotional tags
                        pitch: false,
                        volume: false,
                    },
                    chunkDurationSeconds: {
                        min: 5,
                        max: 600,
                        default: 30,
                        description: "Gemini TTS supports up to 600 seconds (10 minutes) per chunk for longer audio segments.",
                    },
                },
                maxPromptLength: 3000, // Gemini TTS has a 4000 byte limit (text + prompt combined), conservative 3000 char limit
            },
            "gemini-2.5-pro-tts": {
                ttsOptions: {
                    voices: [
                        {
                            id: "Achernar",
                            name: "Achernar",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-achernar.wav",
                        },
                        {
                            id: "Achird",
                            name: "Achird",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-achird.wav",
                        },
                        {
                            id: "Algenib",
                            name: "Algenib",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-algenib.wav",
                        },
                        {
                            id: "Algieba",
                            name: "Algieba",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-algieba.wav",
                        },
                        {
                            id: "Alnilam",
                            name: "Alnilam",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-alnilam.wav",
                        },
                        {
                            id: "Aoede",
                            name: "Aoede",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-aoede.wav",
                        },
                        {
                            id: "Autonoe",
                            name: "Autonoe",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-autonoe.wav",
                        },
                        {
                            id: "Callirrhoe",
                            name: "Callirrhoe",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-callirrhoe.wav",
                        },
                        {
                            id: "Charon",
                            name: "Charon",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-charon.wav",
                        },
                        {
                            id: "Despina",
                            name: "Despina",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-despina.wav",
                        },
                        {
                            id: "Enceladus",
                            name: "Enceladus",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-enceladus.wav",
                        },
                        {
                            id: "Erinome",
                            name: "Erinome",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-erinome.wav",
                        },
                        {
                            id: "Fenrir",
                            name: "Fenrir",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-fenrir.wav",
                        },
                        {
                            id: "Gacrux",
                            name: "Gacrux",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-gacrux.wav",
                        },
                        {
                            id: "Iapetus",
                            name: "Iapetus",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-iapetus.wav",
                        },
                        {
                            id: "Kore",
                            name: "Kore",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-kore.wav",
                        },
                        {
                            id: "Laomedeia",
                            name: "Laomedeia",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-laomedeia.wav",
                        },
                        {
                            id: "Leda",
                            name: "Leda",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-leda.wav",
                        },
                        {
                            id: "Orus",
                            name: "Orus",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-orus.wav",
                        },
                        {
                            id: "Puck",
                            name: "Puck",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-puck.wav",
                        },
                        {
                            id: "Pulcherrima",
                            name: "Pulcherrima",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-pulcherrima.wav",
                        },
                        {
                            id: "Rasalgethi",
                            name: "Rasalgethi",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-rasalgethi.wav",
                        },
                        {
                            id: "Sadachbia",
                            name: "Sadachbia",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-sadachbia.wav",
                        },
                        {
                            id: "Sadaltager",
                            name: "Sadaltager",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-sadaltager.wav",
                        },
                        {
                            id: "Schedar",
                            name: "Schedar",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-schedar.wav",
                        },
                        {
                            id: "Sulafat",
                            name: "Sulafat",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-sulafat.wav",
                        },
                        {
                            id: "Umbriel",
                            name: "Umbriel",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-umbriel.wav",
                        },
                        {
                            id: "Vindemiatrix",
                            name: "Vindemiatrix",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-vindemiatrix.wav",
                        },
                        {
                            id: "Zephyr",
                            name: "Zephyr",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-zephyr.wav",
                        },
                        {
                            id: "Zubenelgenubi",
                            name: "Zubenelgenubi",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-zubenelgenubi.wav",
                        },
                    ],
                    languages: [
                        { code: "ar-XA", name: "Arabic (Generic)" },
                        { code: "bg-BG", name: "Bulgarian (Bulgaria)" },
                        { code: "bn-IN", name: "Bengali (India)" },
                        { code: "cmn-CN", name: "Mandarin Chinese (China)" },
                        { code: "cs-CZ", name: "Czech (Czech Republic)" },
                        { code: "da-DK", name: "Danish (Denmark)" },
                        { code: "de-DE", name: "German (Germany)" },
                        { code: "el-GR", name: "Greek (Greece)" },
                        { code: "en-AU", name: "English (Australia)" },
                        { code: "en-GB", name: "English (United Kingdom)" },
                        { code: "en-IN", name: "English (India)" },
                        { code: "en-US", name: "English (United States)" },
                        { code: "es-ES", name: "Spanish (Spain)" },
                        { code: "es-US", name: "Spanish (United States)" },
                        { code: "et-EE", name: "Estonian (Estonia)" },
                        { code: "fi-FI", name: "Finnish (Finland)" },
                        { code: "fr-CA", name: "French (Canada)" },
                        { code: "fr-FR", name: "French (France)" },
                        { code: "gu-IN", name: "Gujarati (India)" },
                        { code: "he-IL", name: "Hebrew (Israel)" },
                        { code: "hi-IN", name: "Hindi (India)" },
                        { code: "hr-HR", name: "Croatian (Croatia)" },
                        { code: "hu-HU", name: "Hungarian (Hungary)" },
                        { code: "id-ID", name: "Indonesian (Indonesia)" },
                        { code: "it-IT", name: "Italian (Italy)" },
                        { code: "ja-JP", name: "Japanese (Japan)" },
                        { code: "kn-IN", name: "Kannada (India)" },
                        { code: "ko-KR", name: "Korean (South Korea)" },
                        { code: "lt-LT", name: "Lithuanian (Lithuania)" },
                        { code: "lv-LV", name: "Latvian (Latvia)" },
                        { code: "ml-IN", name: "Malayalam (India)" },
                        { code: "mr-IN", name: "Marathi (India)" },
                        { code: "nb-NO", name: "Norwegian Bokmål (Norway)" },
                        { code: "nl-BE", name: "Dutch (Belgium)" },
                        { code: "nl-NL", name: "Dutch (Netherlands)" },
                        { code: "pl-PL", name: "Polish (Poland)" },
                        { code: "pt-BR", name: "Portuguese (Brazil)" },
                        { code: "ro-RO", name: "Romanian (Romania)" },
                        { code: "ru-RU", name: "Russian (Russia)" },
                        { code: "sk-SK", name: "Slovak (Slovakia)" },
                        { code: "sl-SI", name: "Slovenian (Slovenia)" },
                        { code: "sr-RS", name: "Serbian (Cyrillic)" },
                        { code: "sv-SE", name: "Swedish (Sweden)" },
                        { code: "sw-KE", name: "Swahili (Kenya)" },
                        { code: "ta-IN", name: "Tamil (India)" },
                        { code: "te-IN", name: "Telugu (India)" },
                        { code: "th-TH", name: "Thai (Thailand)" },
                        { code: "tr-TR", name: "Turkish (Turkey)" },
                        { code: "uk-UA", name: "Ukrainian (Ukraine)" },
                        { code: "ur-IN", name: "Urdu (India)" },
                        { code: "vi-VN", name: "Vietnamese (Vietnam)" },
                    ],
                    speedRange: { min: 0.25, max: 4.0, default: 1.0 },
                    supportsInstructions: true,
                    chunkDurationSeconds: {
                        min: 5,
                        max: 600,
                        default: 30,
                        description: "Gemini TTS supports up to 600 seconds (10 minutes) per chunk for longer audio segments.",
                    },
                },
            },
            // Lyria music generation
            "lyria-realtime-exp": {
                musicOptions: {
                    genres: [
                        { id: "ambient", name: "Ambient" },
                        { id: "electronic", name: "Electronic" },
                        { id: "cinematic", name: "Cinematic" },
                        { id: "jazz", name: "Jazz" },
                        { id: "classical", name: "Classical" },
                        { id: "rock", name: "Rock" },
                        { id: "pop", name: "Pop" },
                        { id: "folk", name: "Folk" },
                        { id: "hip-hop", name: "Hip-Hop" },
                        { id: "lofi", name: "Lo-Fi" },
                    ],
                    moods: [
                        { id: "calm", name: "Calm" },
                        { id: "happy", name: "Happy" },
                        { id: "sad", name: "Sad" },
                        { id: "energetic", name: "Energetic" },
                        { id: "mysterious", name: "Mysterious" },
                        { id: "dramatic", name: "Dramatic" },
                        { id: "romantic", name: "Romantic" },
                        { id: "tense", name: "Tense" },
                    ],
                    tempos: [
                        { id: "slow", name: "Slow" },
                        { id: "medium", name: "Medium" },
                        { id: "fast", name: "Fast" },
                    ],
                    durationRange: { min: 5, max: 300, default: 30 },
                    supportedOptions: {
                        genre: true,
                        mood: true,
                        tempo: true,
                        instrumental: true,
                    },
                },
            },
            // Gemini 2.5 Flash Lite TTS (Preview)
            "gemini-2.5-flash-lite-preview-tts": {
                ttsOptions: {
                    voices: [
                        {
                            id: "Achernar",
                            name: "Achernar",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-achernar.wav",
                        },
                        {
                            id: "Achird",
                            name: "Achird",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-achird.wav",
                        },
                        {
                            id: "Algenib",
                            name: "Algenib",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-algenib.wav",
                        },
                        {
                            id: "Algieba",
                            name: "Algieba",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-algieba.wav",
                        },
                        {
                            id: "Alnilam",
                            name: "Alnilam",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-alnilam.wav",
                        },
                        {
                            id: "Aoede",
                            name: "Aoede",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-aoede.wav",
                        },
                        {
                            id: "Autonoe",
                            name: "Autonoe",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-autonoe.wav",
                        },
                        {
                            id: "Callirrhoe",
                            name: "Callirrhoe",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-callirrhoe.wav",
                        },
                        {
                            id: "Charon",
                            name: "Charon",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-charon.wav",
                        },
                        {
                            id: "Despina",
                            name: "Despina",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-despina.wav",
                        },
                        {
                            id: "Enceladus",
                            name: "Enceladus",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-enceladus.wav",
                        },
                        {
                            id: "Erinome",
                            name: "Erinome",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-erinome.wav",
                        },
                        {
                            id: "Fenrir",
                            name: "Fenrir",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-fenrir.wav",
                        },
                        {
                            id: "Gacrux",
                            name: "Gacrux",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-gacrux.wav",
                        },
                        {
                            id: "Iapetus",
                            name: "Iapetus",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-iapetus.wav",
                        },
                        {
                            id: "Kore",
                            name: "Kore",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-kore.wav",
                        },
                        {
                            id: "Laomedeia",
                            name: "Laomedeia",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-laomedeia.wav",
                        },
                        {
                            id: "Leda",
                            name: "Leda",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-leda.wav",
                        },
                        {
                            id: "Orus",
                            name: "Orus",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-orus.wav",
                        },
                        {
                            id: "Puck",
                            name: "Puck",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-puck.wav",
                        },
                        {
                            id: "Pulcherrima",
                            name: "Pulcherrima",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-pulcherrima.wav",
                        },
                        {
                            id: "Rasalgethi",
                            name: "Rasalgethi",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-rasalgethi.wav",
                        },
                        {
                            id: "Sadachbia",
                            name: "Sadachbia",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-sadachbia.wav",
                        },
                        {
                            id: "Sadaltager",
                            name: "Sadaltager",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-sadaltager.wav",
                        },
                        {
                            id: "Schedar",
                            name: "Schedar",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-schedar.wav",
                        },
                        {
                            id: "Sulafat",
                            name: "Sulafat",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-sulafat.wav",
                        },
                        {
                            id: "Umbriel",
                            name: "Umbriel",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-umbriel.wav",
                        },
                        {
                            id: "Vindemiatrix",
                            name: "Vindemiatrix",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-vindemiatrix.wav",
                        },
                        {
                            id: "Zephyr",
                            name: "Zephyr",
                            gender: "female",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-zephyr.wav",
                        },
                        {
                            id: "Zubenelgenubi",
                            name: "Zubenelgenubi",
                            gender: "male",
                            previewUrl: "https://docs.cloud.google.com/static/text-to-speech/docs/audio/chirp3-hd-zubenelgenubi.wav",
                        },
                    ],
                    languages: [
                        { code: "ar-XA", name: "Arabic (Generic)" },
                        { code: "bg-BG", name: "Bulgarian (Bulgaria)" },
                        { code: "bn-IN", name: "Bengali (India)" },
                        { code: "cmn-CN", name: "Mandarin Chinese (China)" },
                        { code: "cs-CZ", name: "Czech (Czech Republic)" },
                        { code: "da-DK", name: "Danish (Denmark)" },
                        { code: "de-DE", name: "German (Germany)" },
                        { code: "el-GR", name: "Greek (Greece)" },
                        { code: "en-AU", name: "English (Australia)" },
                        { code: "en-GB", name: "English (United Kingdom)" },
                        { code: "en-IN", name: "English (India)" },
                        { code: "en-US", name: "English (United States)" },
                        { code: "es-ES", name: "Spanish (Spain)" },
                        { code: "es-US", name: "Spanish (United States)" },
                        { code: "et-EE", name: "Estonian (Estonia)" },
                        { code: "fi-FI", name: "Finnish (Finland)" },
                        { code: "fr-CA", name: "French (Canada)" },
                        { code: "fr-FR", name: "French (France)" },
                        { code: "gu-IN", name: "Gujarati (India)" },
                        { code: "he-IL", name: "Hebrew (Israel)" },
                        { code: "hi-IN", name: "Hindi (India)" },
                        { code: "hr-HR", name: "Croatian (Croatia)" },
                        { code: "hu-HU", name: "Hungarian (Hungary)" },
                        { code: "id-ID", name: "Indonesian (Indonesia)" },
                        { code: "it-IT", name: "Italian (Italy)" },
                        { code: "ja-JP", name: "Japanese (Japan)" },
                        { code: "kn-IN", name: "Kannada (India)" },
                        { code: "ko-KR", name: "Korean (South Korea)" },
                        { code: "lt-LT", name: "Lithuanian (Lithuania)" },
                        { code: "lv-LV", name: "Latvian (Latvia)" },
                        { code: "ml-IN", name: "Malayalam (India)" },
                        { code: "mr-IN", name: "Marathi (India)" },
                        { code: "nb-NO", name: "Norwegian Bokmål (Norway)" },
                        { code: "nl-BE", name: "Dutch (Belgium)" },
                        { code: "nl-NL", name: "Dutch (Netherlands)" },
                        { code: "pl-PL", name: "Polish (Poland)" },
                        { code: "pt-BR", name: "Portuguese (Brazil)" },
                        { code: "ro-RO", name: "Romanian (Romania)" },
                        { code: "ru-RU", name: "Russian (Russia)" },
                        { code: "sk-SK", name: "Slovak (Slovakia)" },
                        { code: "sl-SI", name: "Slovenian (Slovenia)" },
                        { code: "sr-RS", name: "Serbian (Cyrillic)" },
                        { code: "sv-SE", name: "Swedish (Sweden)" },
                        { code: "sw-KE", name: "Swahili (Kenya)" },
                        { code: "ta-IN", name: "Tamil (India)" },
                        { code: "te-IN", name: "Telugu (India)" },
                        { code: "th-TH", name: "Thai (Thailand)" },
                        { code: "tr-TR", name: "Turkish (Turkey)" },
                        { code: "uk-UA", name: "Ukrainian (Ukraine)" },
                        { code: "ur-IN", name: "Urdu (India)" },
                        { code: "vi-VN", name: "Vietnamese (Vietnam)" },
                    ],
                    speedRange: { min: 0.25, max: 4.0, default: 1.0 },
                    supportsInstructions: true,
                    chunkDurationSeconds: {
                        min: 5,
                        max: 300,
                        default: 30,
                        description: "OpenAI TTS supports up to 300 seconds (5 minutes) per chunk. Longer chunks may take more time to generate.",
                    },
                },
            },
        },
    },
    elevenlabs: {
        id: "elevenlabs",
        name: "ElevenLabs",
        description: "Premium realistic voices, background music, and sound effects",
        website: "https://try.elevenlabs.io/eff39b2jrnzp",
        apiKeyUrl: "https://elevenlabs.io/app/settings/api-keys",
        capabilities: ["tts", "music-generation", "sound-effects"],
        fields: [
            {
                name: "apiKey",
                label: "API Key",
                type: "password",
                required: true,
                description: "Your ElevenLabs API key (starts with sk_...)",
            },
        ],
        notes: "Supports high-quality TTS, music generation, and sound effects",
        models: {
            tts: [
                {
                    id: "eleven_multilingual_v2",
                    name: "Multilingual v2",
                    description: "Best quality, 29 languages",
                    default: true,
                    pricing: { perMillionCharacters: 300 },
                },
                {
                    id: "eleven_turbo_v2_5",
                    name: "Turbo v2.5",
                    description: "Low latency, 32 languages",
                    pricing: { perMillionCharacters: 150 },
                },
                {
                    id: "eleven_turbo_v2",
                    name: "Turbo v2",
                    description: "Low latency English",
                    pricing: { perMillionCharacters: 150 },
                },
                {
                    id: "eleven_monolingual_v1",
                    name: "English v1",
                    description: "Legacy English model",
                    pricing: { perMillionCharacters: 200 },
                },
            ],
            "music-generation": [
                {
                    id: "elevenlabs-music",
                    name: "ElevenLabs Music",
                    description: "Background music generation",
                    default: true,
                    pricing: { perGeneration: 0.18, perSecond: 0.03 },
                },
            ],
            "sound-effects": [
                {
                    id: "elevenlabs-sfx",
                    name: "ElevenLabs SFX",
                    description: "Sound effects generation",
                    default: true,
                    pricing: { perGeneration: 0.18, perSecond: 0.02 },
                },
            ],
        },
        generationOptions: {
            // TTS models - ElevenLabs uses user's voice library, so no predefined voices
            eleven_multilingual_v2: {
                ttsOptions: {
                    speedRange: { min: 0.7, max: 1.2, default: 1.0 }, // ElevenLabs API requires speed between 0.7 and 1.2
                    supportedOptions: {
                        voice: true, // Uses ElevenLabsVoiceSelector (API-based)
                        speed: true,
                        language: true, // language_code
                        emotionalTags: true, // ElevenLabs supports emotional tags
                    },
                    chunkDurationSeconds: {
                        min: 5,
                        max: 120,
                        default: 30,
                        description: "ElevenLabs TTS works best with chunks up to 120 seconds (2 minutes) for optimal quality.",
                    },
                    // Stability: 0-1, controls voice consistency
                    // Similarity boost: 0-1, controls voice matching
                },
                maxPromptLength: 5000, // ElevenLabs TTS doesn't have a hard limit, but 5000 is a safe default for preview
            },
            eleven_turbo_v2_5: {
                ttsOptions: {
                    speedRange: { min: 0.7, max: 1.2, default: 1.0 }, // ElevenLabs API requires speed between 0.7 and 1.2
                    supportedOptions: {
                        voice: true,
                        speed: true,
                        language: true,
                        emotionalTags: true,
                    },
                    chunkDurationSeconds: {
                        min: 5,
                        max: 120,
                        default: 30,
                        description: "ElevenLabs TTS works best with chunks up to 120 seconds (2 minutes) for optimal quality.",
                    },
                },
                maxPromptLength: 5000, // ElevenLabs TTS doesn't have a hard limit, but 5000 is a safe default for preview
            },
            eleven_turbo_v2: {
                ttsOptions: {
                    speedRange: { min: 0.7, max: 1.2, default: 1.0 }, // ElevenLabs API requires speed between 0.7 and 1.2
                    supportedOptions: {
                        voice: true,
                        speed: true,
                        language: true,
                        emotionalTags: true,
                    },
                    chunkDurationSeconds: {
                        min: 5,
                        max: 120,
                        default: 30,
                        description: "ElevenLabs TTS works best with chunks up to 120 seconds (2 minutes) for optimal quality.",
                    },
                },
                maxPromptLength: 5000, // ElevenLabs TTS doesn't have a hard limit, but 5000 is a safe default for preview
            },
            eleven_monolingual_v1: {
                ttsOptions: {
                    speedRange: { min: 0.7, max: 1.2, default: 1.0 }, // ElevenLabs API requires speed between 0.7 and 1.2
                    supportedOptions: {
                        voice: true,
                        speed: true,
                        language: false, // Monolingual English only
                        emotionalTags: true,
                    },
                    chunkDurationSeconds: {
                        min: 5,
                        max: 120,
                        default: 30,
                        description: "ElevenLabs TTS works best with chunks up to 120 seconds (2 minutes) for optimal quality.",
                    },
                },
                maxPromptLength: 5000, // ElevenLabs TTS doesn't have a hard limit, but 5000 is a safe default for preview
            },
            // Music generation
            "elevenlabs-music": {
                musicOptions: {
                    genres: [
                        { id: "ambient", name: "Ambient" },
                        { id: "electronic", name: "Electronic" },
                        { id: "cinematic", name: "Cinematic" },
                        { id: "jazz", name: "Jazz" },
                        { id: "classical", name: "Classical" },
                        { id: "rock", name: "Rock" },
                        { id: "pop", name: "Pop" },
                        { id: "folk", name: "Folk" },
                        { id: "hip-hop", name: "Hip-Hop" },
                        { id: "lofi", name: "Lo-Fi" },
                    ],
                    moods: [
                        { id: "calm", name: "Calm" },
                        { id: "happy", name: "Happy" },
                        { id: "sad", name: "Sad" },
                        { id: "energetic", name: "Energetic" },
                        { id: "mysterious", name: "Mysterious" },
                        { id: "dramatic", name: "Dramatic" },
                        { id: "romantic", name: "Romantic" },
                        { id: "tense", name: "Tense" },
                    ],
                    tempos: [
                        { id: "slow", name: "Slow" },
                        { id: "medium", name: "Medium" },
                        { id: "fast", name: "Fast" },
                    ],
                    durationRange: { min: 5, max: 300, default: 30 },
                    supportedOptions: {
                        genre: true,
                        mood: true,
                        tempo: true,
                        instrumental: true,
                    },
                },
                maxPromptLength: 500, // Music generation prompts are typically short descriptions
            },
            // Sound effects
            "elevenlabs-sfx": {
                musicOptions: {
                    genres: [
                        { id: "ambient", name: "Ambient" },
                        { id: "electronic", name: "Electronic" },
                        { id: "cinematic", name: "Cinematic" },
                        { id: "jazz", name: "Jazz" },
                        { id: "classical", name: "Classical" },
                        { id: "rock", name: "Rock" },
                        { id: "pop", name: "Pop" },
                        { id: "folk", name: "Folk" },
                        { id: "hip-hop", name: "Hip-Hop" },
                        { id: "lofi", name: "Lo-Fi" },
                    ],
                    moods: [
                        { id: "calm", name: "Calm" },
                        { id: "happy", name: "Happy" },
                        { id: "sad", name: "Sad" },
                        { id: "energetic", name: "Energetic" },
                        { id: "mysterious", name: "Mysterious" },
                        { id: "dramatic", name: "Dramatic" },
                        { id: "romantic", name: "Romantic" },
                        { id: "tense", name: "Tense" },
                    ],
                    tempos: [
                        { id: "slow", name: "Slow" },
                        { id: "medium", name: "Medium" },
                        { id: "fast", name: "Fast" },
                    ],
                    durationRange: { min: 1, max: 10, default: 5 },
                },
                maxPromptLength: 500, // Sound effect prompts are typically short descriptions
            },
        },
    },
    playht: {
        id: "playht",
        name: "Play.HT",
        description: "High-quality text-to-speech with voice cloning capabilities",
        website: "https://play.ht",
        apiKeyUrl: "https://play.ht/app/api-access",
        capabilities: ["tts"],
        fields: [
            {
                name: "userId",
                label: "User ID",
                type: "text",
                required: true,
                description: "Your Play.HT User ID",
            },
            {
                name: "apiKey",
                label: "API Key",
                type: "password",
                required: true,
                description: "Your Play.HT API key",
            },
        ],
        notes: "Requires both User ID and API Key. Supports high-quality TTS with voice cloning.",
        models: {
            tts: [
                {
                    id: "PlayHT2.0-turbo",
                    name: "PlayHT 2.0 Turbo",
                    description: "Fast, high quality",
                    default: true,
                    pricing: { perMillionCharacters: 50 },
                },
                {
                    id: "PlayHT2.0",
                    name: "PlayHT 2.0",
                    description: "Standard quality",
                    pricing: { perMillionCharacters: 50 },
                },
                {
                    id: "PlayHT1.0",
                    name: "PlayHT 1.0",
                    description: "Legacy model",
                    pricing: { perMillionCharacters: 30 },
                },
            ],
        },
        generationOptions: {
            // PlayHT uses voice IDs from user's library, no predefined voices
            "PlayHT2.0-turbo": {
                ttsOptions: {
                    speedRange: { min: 0.5, max: 2.0, default: 1.0 },
                    supportedOptions: {
                        voice: true, // Uses text input for voice ID/URL
                        speed: true,
                        emotionalTags: true, // PlayHT supports emotional tags
                    },
                    chunkDurationSeconds: {
                        min: 5,
                        max: 300,
                        default: 30,
                        description: "Play.HT TTS supports up to 300 seconds (5 minutes) per chunk.",
                    },
                },
                maxPromptLength: 5000, // PlayHT TTS doesn't have a hard limit, but 5000 is a safe default for preview
            },
            "PlayHT2.0": {
                ttsOptions: {
                    speedRange: { min: 0.5, max: 2.0, default: 1.0 },
                    supportedOptions: {
                        voice: true,
                        speed: true,
                        emotionalTags: true,
                    },
                    chunkDurationSeconds: {
                        min: 5,
                        max: 300,
                        default: 30,
                        description: "Play.HT TTS supports up to 300 seconds (5 minutes) per chunk.",
                    },
                },
                maxPromptLength: 5000, // PlayHT TTS doesn't have a hard limit, but 5000 is a safe default for preview
            },
            "PlayHT1.0": {
                ttsOptions: {
                    speedRange: { min: 0.5, max: 2.0, default: 1.0 },
                    supportedOptions: {
                        voice: true,
                        speed: true,
                        emotionalTags: true,
                    },
                    chunkDurationSeconds: {
                        min: 5,
                        max: 300,
                        default: 30,
                        description: "Play.HT TTS supports up to 300 seconds (5 minutes) per chunk.",
                    },
                },
                maxPromptLength: 5000, // PlayHT TTS doesn't have a hard limit, but 5000 is a safe default for preview
            },
        },
    },
    huggingface: {
        id: "huggingface",
        name: "HuggingFace",
        description: "Open-source image generation with Flux and other cutting-edge models",
        website: "https://huggingface.co",
        apiKeyUrl: "https://huggingface.co/settings/tokens",
        capabilities: ["image-generation"],
        fields: [
            {
                name: "apiKey",
                label: "Access Token",
                type: "password",
                required: true,
                description: "Your HuggingFace access token (starts with hf_...)",
            },
        ],
        notes: "Supports Flux and Stable Diffusion models via HuggingFace Inference API",
        models: {
            "image-generation": [
                {
                    id: "black-forest-labs/FLUX.1-schnell",
                    name: "Flux Schnell",
                    description: "Fast generation",
                    default: true,
                    pricing: { perUnit: 0.003 },
                },
                {
                    id: "black-forest-labs/FLUX.1-dev",
                    name: "Flux Dev",
                    description: "Development quality",
                    pricing: { perUnit: 0.025 },
                },
                {
                    id: "stabilityai/stable-diffusion-xl-base-1.0",
                    name: "Stable Diffusion XL",
                    description: "High quality",
                    pricing: { perUnit: 0.004 },
                },
            ],
        },
        generationOptions: {
            // Flux Schnell - Fast generation
            "black-forest-labs/FLUX.1-schnell": {
                imageSizes: [
                    { width: 1024, height: 1024, label: "1024×1024 (1:1)", aspectRatio: "1:1" },
                    { width: 1024, height: 768, label: "1024×768 (4:3)", aspectRatio: "4:3" },
                    { width: 768, height: 1024, label: "768×1024 (3:4)", aspectRatio: "3:4" },
                    { width: 1024, height: 576, label: "1024×576 (16:9)", aspectRatio: "16:9" },
                    { width: 576, height: 1024, label: "576×1024 (9:16)", aspectRatio: "9:16" },
                ],
            },
            // Flux Dev - Development quality
            "black-forest-labs/FLUX.1-dev": {
                imageSizes: [
                    { width: 1024, height: 1024, label: "1024×1024 (1:1)", aspectRatio: "1:1" },
                    { width: 1024, height: 768, label: "1024×768 (4:3)", aspectRatio: "4:3" },
                    { width: 768, height: 1024, label: "768×1024 (3:4)", aspectRatio: "3:4" },
                    { width: 1024, height: 576, label: "1024×576 (16:9)", aspectRatio: "16:9" },
                    { width: 576, height: 1024, label: "576×1024 (9:16)", aspectRatio: "9:16" },
                ],
            },
            // Stable Diffusion XL - High quality
            "stabilityai/stable-diffusion-xl-base-1.0": {
                imageSizes: [
                    { width: 1024, height: 1024, label: "1024×1024 (1:1)", aspectRatio: "1:1" },
                    { width: 1152, height: 896, label: "1152×896 (4:3)", aspectRatio: "4:3" },
                    { width: 896, height: 1152, label: "896×1152 (3:4)", aspectRatio: "3:4" },
                    { width: 1344, height: 768, label: "1344×768 (16:9)", aspectRatio: "16:9" },
                    { width: 768, height: 1344, label: "768×1344 (9:16)", aspectRatio: "9:16" },
                ],
            },
        },
    },
};
/**
 * Get all provider IDs
 */
function getProviderIds() {
    return Object.keys(exports.AI_PROVIDERS);
}
/**
 * Get a provider configuration by ID
 */
function getProviderConfig(providerId) {
    return exports.AI_PROVIDERS[providerId];
}
/**
 * Get all providers that support a specific capability
 */
function getProvidersByCapability(capability) {
    return Object.values(exports.AI_PROVIDERS).filter(provider => provider.capabilities.includes(capability));
}
/**
 * Validate that a provider ID is supported
 */
function isValidProvider(providerId) {
    return providerId in exports.AI_PROVIDERS;
}
/**
 * Get the required field names for a provider
 */
function getRequiredFields(providerId) {
    const provider = getProviderConfig(providerId);
    if (!provider)
        return [];
    return provider.fields.filter(field => field.required).map(field => field.name);
}
/**
 * Check if a provider supports a specific capability
 */
function providerSupports(providerId, capability) {
    const provider = getProviderConfig(providerId);
    if (!provider)
        return false;
    return provider.capabilities.includes(capability);
}
/**
 * Get available models for a provider and capability
 */
function getModelsForProvider(providerId, capability) {
    const provider = getProviderConfig(providerId);
    if (!provider || !provider.models)
        return [];
    return provider.models[capability] || [];
}
/**
 * Get the default model for a provider and capability
 */
function getDefaultModel(providerId, capability) {
    const models = getModelsForProvider(providerId, capability);
    return models.find(m => m.default) || models[0];
}
/**
 * Validate that a model ID is valid for a provider and capability
 */
function isValidModel(providerId, capability, modelId) {
    const models = getModelsForProvider(providerId, capability);
    return models.some(m => m.id === modelId);
}
/**
 * Get generation options for a specific model
 */
function getGenerationOptions(providerId, modelId) {
    const provider = getProviderConfig(providerId);
    if (!provider || !provider.generationOptions)
        return undefined;
    return provider.generationOptions[modelId];
}
/**
 * Get the maximum prompt length for a specific model
 * Returns undefined if no limit is specified
 */
function getMaxPromptLength(providerId, modelId) {
    const options = getGenerationOptions(providerId, modelId);
    return options?.maxPromptLength;
}
/**
 * Get available image sizes for a model
 */
function getImageSizesForModel(providerId, modelId) {
    const options = getGenerationOptions(providerId, modelId);
    return options?.imageSizes || [];
}
/**
 * Get video generation options for a model
 */
function getVideoOptionsForModel(providerId, modelId) {
    const options = getGenerationOptions(providerId, modelId);
    return options?.videoOptions;
}
/**
 * Get the default image size for a model (first one in the list, typically square)
 */
function getDefaultImageSize(providerId, modelId) {
    const sizes = getImageSizesForModel(providerId, modelId);
    return sizes[0];
}
/**
 * Get TTS options for a specific model
 */
function getTTSOptionsForModel(providerId, modelId) {
    const options = getGenerationOptions(providerId, modelId);
    return options?.ttsOptions;
}
/**
 * Get available voices for a TTS model
 */
function getVoicesForModel(providerId, modelId) {
    const ttsOptions = getTTSOptionsForModel(providerId, modelId);
    return ttsOptions?.voices || [];
}
/**
 * Get available languages for a TTS model
 */
function getLanguagesForModel(providerId, modelId) {
    const ttsOptions = getTTSOptionsForModel(providerId, modelId);
    return ttsOptions?.languages || [];
}
/**
 * Get speed range for a TTS model
 */
function getSpeedRangeForModel(providerId, modelId) {
    const ttsOptions = getTTSOptionsForModel(providerId, modelId);
    return ttsOptions?.speedRange;
}
/**
 * Check if a TTS model supports instructions
 */
function modelSupportsInstructions(providerId, modelId) {
    const ttsOptions = getTTSOptionsForModel(providerId, modelId);
    // Check new supportedOptions first, fallback to legacy supportsInstructions
    if (ttsOptions?.supportedOptions?.instructions !== undefined) {
        return ttsOptions.supportedOptions.instructions;
    }
    return ttsOptions?.supportsInstructions || false;
}
/**
 * Get supported options for a model (unified schema)
 * Checks ttsOptions, videoOptions, musicOptions, and model-level supportedOptions
 */
function getSupportedOptionsForModel(providerId, modelId) {
    const options = getGenerationOptions(providerId, modelId);
    // Check model-level first
    if (options?.supportedOptions) {
        return options.supportedOptions;
    }
    // Check capability-specific options
    const ttsOptions = options?.ttsOptions;
    if (ttsOptions?.supportedOptions) {
        return ttsOptions.supportedOptions;
    }
    const videoOptions = options?.videoOptions;
    if (videoOptions?.supportedOptions) {
        return videoOptions.supportedOptions;
    }
    const musicOptions = options?.musicOptions;
    if (musicOptions?.supportedOptions) {
        return musicOptions.supportedOptions;
    }
    return undefined;
}
/**
 * Get chunk duration limits for a TTS provider
 * Returns the chunk duration configuration from any TTS model of the provider
 */
function getChunkDurationForProvider(providerId) {
    const provider = exports.AI_PROVIDERS[providerId];
    if (!provider?.generationOptions) {
        return undefined;
    }
    // Find any TTS model for this provider
    for (const [modelId, options] of Object.entries(provider.generationOptions)) {
        if (options?.ttsOptions?.chunkDurationSeconds) {
            return options.ttsOptions.chunkDurationSeconds;
        }
    }
    // Default fallback
    return {
        min: 5,
        max: 300,
        default: 30,
        description: "Default limits when provider is auto-detected or unknown.",
    };
}
/**
 * Get music generation options for a specific model
 */
function getMusicOptionsForModel(providerId, modelId) {
    const options = getGenerationOptions(providerId, modelId);
    return options?.musicOptions;
}
/**
 * Get available genres for a music model
 */
function getGenresForModel(providerId, modelId) {
    const musicOptions = getMusicOptionsForModel(providerId, modelId);
    return musicOptions?.genres || [];
}
/**
 * Get available moods for a music model
 */
function getMoodsForModel(providerId, modelId) {
    const musicOptions = getMusicOptionsForModel(providerId, modelId);
    return musicOptions?.moods || [];
}
/**
 * Get available tempos for a music model
 */
function getTemposForModel(providerId, modelId) {
    const musicOptions = getMusicOptionsForModel(providerId, modelId);
    return musicOptions?.tempos || [];
}
/**
 * Get duration range for a music model
 */
function getDurationRangeForModel(providerId, modelId) {
    const musicOptions = getMusicOptionsForModel(providerId, modelId);
    return musicOptions?.durationRange;
}
/**
 * Get pricing for a specific model
 */
function getModelPricing(providerId, modelId) {
    const provider = getProviderConfig(providerId);
    if (!provider || !provider.models)
        return undefined;
    // Search through all capabilities to find the model
    for (const capability of Object.keys(provider.models)) {
        const models = provider.models[capability];
        if (models) {
            const model = models.find(m => m.id === modelId);
            if (model?.pricing) {
                return model.pricing;
            }
        }
    }
    return undefined;
}
/**
 * Get hard-coded default provider and model for a capability
 * Used as fallback when no profile or settings are configured
 */
function getHardCodedDefaults(capability) {
    const providers = getProvidersByCapability(capability);
    if (providers.length === 0) {
        throw new Error(`No providers found for capability: ${capability}`);
    }
    // Get the first provider that supports this capability
    const defaultProvider = providers[0];
    const defaultModel = getDefaultModel(defaultProvider.id, capability);
    return {
        provider: defaultProvider.id,
        model: defaultModel?.id,
    };
}
//# sourceMappingURL=ai-providers.js.map