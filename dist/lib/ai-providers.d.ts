/**
 * Static configuration for all supported AI providers
 * This defines what services each provider supports and what credentials they require
 *
 * This is the single source of truth for AI provider configuration.
 * Used by app, socket-server, and website.
 */
export type ServiceCapability = "text-generation" | "image-generation" | "tts" | "video-generation" | "music-generation" | "sound-effects" | "transcription" | "embeddings";
export interface ProviderField {
    name: string;
    label: string;
    type: "text" | "password" | "textarea";
    required: boolean;
    description?: string;
    sensitive?: boolean;
}
export interface ModelPricing {
    perUnit?: number;
    perUnitLow?: number;
    perUnitMedium?: number;
    perUnitHigh?: number;
    perUnitFast?: number;
    perUnitStandard?: number;
    perUnitUltra?: number;
    perMillionCharacters?: number;
    perMillionTokens?: number;
    perMillionInputTokens?: number;
    perMillionOutputTokens?: number;
    perSecond?: number;
    perGeneration?: number;
}
export interface ProviderModel {
    id: string;
    name: string;
    description?: string;
    default?: boolean;
    pricing?: ModelPricing;
}
/**
 * Supported image size/dimension options for image generation
 */
export interface ImageSizeOption {
    width: number;
    height: number;
    label: string;
    aspectRatio: string;
}
/**
 * Supported video generation options
 */
/**
 * Unified schema for supported options across all provider types
 * Maps to shared components and feature flags
 */
export interface SupportedOptions {
    instructions?: boolean;
    emotionalTags?: boolean;
    voice?: boolean;
    language?: boolean;
    speed?: boolean;
    pitch?: boolean;
    volume?: boolean;
    size?: boolean;
    quality?: string[];
    style?: string[];
    aspectRatio?: boolean;
    personGeneration?: boolean;
    resolution?: boolean;
    duration?: boolean | number[];
    inputReference?: boolean;
    firstFrame?: boolean;
    lastFrame?: boolean;
    genre?: boolean;
    mood?: boolean;
    tempo?: boolean;
    instrumental?: boolean;
}
export interface VideoGenerationOptions {
    resolutions: string[];
    aspectRatios: string[];
    maxDurationSeconds: number;
    durations?: number[];
    supportedOptions?: SupportedOptions;
}
/**
 * TTS voice option
 */
export interface TTSVoiceOption {
    id: string;
    name: string;
    description?: string;
    gender?: "female" | "male" | "neutral";
    previewUrl?: string;
}
/**
 * TTS model-specific options
 */
export interface TTSModelOptions {
    voices?: TTSVoiceOption[];
    languages?: {
        code: string;
        name: string;
    }[];
    speedRange?: {
        min: number;
        max: number;
        default: number;
    };
    supportsInstructions?: boolean;
    supportedOptions?: SupportedOptions;
    chunkDurationSeconds?: {
        min: number;
        max: number;
        default: number;
        description?: string;
    };
}
/**
 * Music generation options
 */
export interface MusicModelOptions {
    genres?: {
        id: string;
        name: string;
    }[];
    moods?: {
        id: string;
        name: string;
    }[];
    tempos?: {
        id: string;
        name: string;
    }[];
    durationRange?: {
        min: number;
        max: number;
        default: number;
    };
    supportedOptions?: SupportedOptions;
}
/**
 * Generation options per model
 */
export interface ModelGenerationOptions {
    imageSizes?: ImageSizeOption[];
    videoOptions?: VideoGenerationOptions;
    ttsOptions?: TTSModelOptions;
    musicOptions?: MusicModelOptions;
    supportedOptions?: SupportedOptions;
    /** Maximum prompt length in characters for this model */
    maxPromptLength?: number;
}
export interface AIProviderConfig {
    id: string;
    name: string;
    description: string;
    website: string;
    apiKeyUrl: string;
    capabilities: ServiceCapability[];
    fields: ProviderField[];
    notes?: string;
    /** Models available per capability */
    models?: Partial<Record<ServiceCapability, ProviderModel[]>>;
    /** Generation options per model ID */
    generationOptions?: Record<string, ModelGenerationOptions>;
}
export declare const AI_PROVIDERS: Record<string, AIProviderConfig>;
/**
 * Get all provider IDs
 */
export declare function getProviderIds(): string[];
/**
 * Get a provider configuration by ID
 */
export declare function getProviderConfig(providerId: string): AIProviderConfig | undefined;
/**
 * Get all providers that support a specific capability
 */
export declare function getProvidersByCapability(capability: ServiceCapability): AIProviderConfig[];
/**
 * Validate that a provider ID is supported
 */
export declare function isValidProvider(providerId: string): boolean;
/**
 * Get the required field names for a provider
 */
export declare function getRequiredFields(providerId: string): string[];
/**
 * Check if a provider supports a specific capability
 */
export declare function providerSupports(providerId: string, capability: ServiceCapability): boolean;
/**
 * Get available models for a provider and capability
 */
export declare function getModelsForProvider(providerId: string, capability: ServiceCapability): ProviderModel[];
/**
 * Get the default model for a provider and capability
 */
export declare function getDefaultModel(providerId: string, capability: ServiceCapability): ProviderModel | undefined;
/**
 * Validate that a model ID is valid for a provider and capability
 */
export declare function isValidModel(providerId: string, capability: ServiceCapability, modelId: string): boolean;
/**
 * Get generation options for a specific model
 */
export declare function getGenerationOptions(providerId: string, modelId: string): ModelGenerationOptions | undefined;
/**
 * Get the maximum prompt length for a specific model
 * Returns undefined if no limit is specified
 */
export declare function getMaxPromptLength(providerId: string, modelId: string): number | undefined;
/**
 * Get available image sizes for a model
 */
export declare function getImageSizesForModel(providerId: string, modelId: string): ImageSizeOption[];
/**
 * Get video generation options for a model
 */
export declare function getVideoOptionsForModel(providerId: string, modelId: string): VideoGenerationOptions | undefined;
/**
 * Get the default image size for a model (first one in the list, typically square)
 */
export declare function getDefaultImageSize(providerId: string, modelId: string): ImageSizeOption | undefined;
/**
 * Get TTS options for a specific model
 */
export declare function getTTSOptionsForModel(providerId: string, modelId: string): TTSModelOptions | undefined;
/**
 * Get available voices for a TTS model
 */
export declare function getVoicesForModel(providerId: string, modelId: string): TTSVoiceOption[];
/**
 * Get available languages for a TTS model
 */
export declare function getLanguagesForModel(providerId: string, modelId: string): {
    code: string;
    name: string;
}[];
/**
 * Get speed range for a TTS model
 */
export declare function getSpeedRangeForModel(providerId: string, modelId: string): {
    min: number;
    max: number;
    default: number;
} | undefined;
/**
 * Check if a TTS model supports instructions
 */
export declare function modelSupportsInstructions(providerId: string, modelId: string): boolean;
/**
 * Get supported options for a model (unified schema)
 * Checks ttsOptions, videoOptions, musicOptions, and model-level supportedOptions
 */
export declare function getSupportedOptionsForModel(providerId: string, modelId: string): SupportedOptions | undefined;
/**
 * Get chunk duration limits for a TTS provider
 * Returns the chunk duration configuration from any TTS model of the provider
 */
export declare function getChunkDurationForProvider(providerId: string): {
    min: number;
    max: number;
    default: number;
    description?: string;
} | undefined;
/**
 * Get music generation options for a specific model
 */
export declare function getMusicOptionsForModel(providerId: string, modelId: string): MusicModelOptions | undefined;
/**
 * Get available genres for a music model
 */
export declare function getGenresForModel(providerId: string, modelId: string): {
    id: string;
    name: string;
}[];
/**
 * Get available moods for a music model
 */
export declare function getMoodsForModel(providerId: string, modelId: string): {
    id: string;
    name: string;
}[];
/**
 * Get available tempos for a music model
 */
export declare function getTemposForModel(providerId: string, modelId: string): {
    id: string;
    name: string;
}[];
/**
 * Get duration range for a music model
 */
export declare function getDurationRangeForModel(providerId: string, modelId: string): {
    min: number;
    max: number;
    default: number;
} | undefined;
/**
 * Get pricing for a specific model
 */
export declare function getModelPricing(providerId: string, modelId: string): ModelPricing | undefined;
/**
 * Get hard-coded default provider and model for a capability
 * Used as fallback when no profile or settings are configured
 */
export declare function getHardCodedDefaults(capability: ServiceCapability): {
    provider: string;
    model?: string;
};
//# sourceMappingURL=ai-providers.d.ts.map