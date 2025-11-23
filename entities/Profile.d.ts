import 'reflect-metadata';
export declare class Profile {
    _id: string;
    userId: string;
    name: string;
    description?: string;
    narratorPromptTemplate?: string;
    introScriptTemplate?: string;
    outroScriptTemplate?: string;
    imageStylePrompt?: string;
    imageDescriptionPrompt?: string;
    soundGenerationPrompt?: string;
    musicGenerationPrompt?: string;
    chapterGenerationPrompt?: string;
    advertisingScriptPrompt?: string;
    enableMidstoryCTA: boolean;
    chapterTransitionPrompt?: string;
    antiAiPrompt?: string;
    imageProvider: string;
    ttsProvider?: string;
    ttsUseEmotionalTags: boolean;
    ttsSettings?: string;
    ttsVoice?: string;
    ttsModel?: string;
    videoProvider: string;
    videoSettings?: string;
    videoStyle: "minimal-talking" | "standard" | "heavy-narration";
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=Profile.d.ts.map