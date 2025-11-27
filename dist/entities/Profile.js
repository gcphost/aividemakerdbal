"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
const typeorm_1 = require("typeorm");
const BaseEntity_1 = require("./BaseEntity");
let Profile = class Profile extends BaseEntity_1.BaseEntity {
    _id;
    userId;
    name;
    description;
    narratorPromptTemplate;
    introScriptTemplate;
    outroScriptTemplate;
    imageStylePrompt;
    imageDescriptionPrompt;
    soundGenerationPrompt;
    musicGenerationPrompt;
    chapterGenerationPrompt;
    advertisingScriptPrompt;
    enableMidstoryCTA;
    chapterTransitionPrompt;
    antiAiPrompt;
    imageProvider;
    ttsProvider;
    ttsUseEmotionalTags;
    ttsSettings;
    ttsVoice;
    ttsModel;
    ttsVoiceInstructions;
    ttsElevenLabsVoiceId;
    ttsChunkDurationSeconds;
    thumbnailImageProvider;
    imageSettings;
    imagesPerMinute;
    maxImagesPerChapter;
    kenBurnsZoomDuration;
    chapterDelaySeconds;
    chapterGapDurationSeconds;
    chunkDelaySeconds;
    autoGenerateSounds;
    autoGenerateMusic;
    musicProvider;
    soundEffectProvider;
    embeddingsProvider;
    embeddingsModel;
    scriptProvider;
    scriptSettings;
    disableImageGeneration;
    disableMusicGeneration;
    disableSoundGeneration;
    channelIntroDurationSeconds;
    channelOutroDurationSeconds;
    wordsPerMinute;
    videoProvider;
    videoSettings;
    openaiSettings;
    videoStyle;
    createdAt;
    updatedAt;
};
exports.Profile = Profile;
__decorate([
    (0, typeorm_1.PrimaryColumn)('varchar'),
    __metadata("design:type", String)
], Profile.prototype, "_id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], Profile.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], Profile.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "narratorPromptTemplate", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "introScriptTemplate", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "outroScriptTemplate", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "imageStylePrompt", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "imageDescriptionPrompt", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "soundGenerationPrompt", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "musicGenerationPrompt", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "chapterGenerationPrompt", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "advertisingScriptPrompt", void 0);
__decorate([
    (0, typeorm_1.Column)('integer', { nullable: false, default: 1 }),
    __metadata("design:type", Boolean)
], Profile.prototype, "enableMidstoryCTA", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "chapterTransitionPrompt", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "antiAiPrompt", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true, default: 'openai' }),
    __metadata("design:type", String)
], Profile.prototype, "imageProvider", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true, default: 'openai' }),
    __metadata("design:type", String)
], Profile.prototype, "ttsProvider", void 0);
__decorate([
    (0, typeorm_1.Column)('integer', { nullable: false, default: 0 }),
    __metadata("design:type", Boolean)
], Profile.prototype, "ttsUseEmotionalTags", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "ttsSettings", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "ttsVoice", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "ttsModel", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "ttsVoiceInstructions", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "ttsElevenLabsVoiceId", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { nullable: true, default: 30 }),
    __metadata("design:type", Number)
], Profile.prototype, "ttsChunkDurationSeconds", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "thumbnailImageProvider", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "imageSettings", void 0);
__decorate([
    (0, typeorm_1.Column)('float', { nullable: true, default: 2.5 }),
    __metadata("design:type", Number)
], Profile.prototype, "imagesPerMinute", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { nullable: true, default: 10 }),
    __metadata("design:type", Number)
], Profile.prototype, "maxImagesPerChapter", void 0);
__decorate([
    (0, typeorm_1.Column)('float', { nullable: true, default: 5 }),
    __metadata("design:type", Number)
], Profile.prototype, "kenBurnsZoomDuration", void 0);
__decorate([
    (0, typeorm_1.Column)('float', { nullable: true, default: 0 }),
    __metadata("design:type", Number)
], Profile.prototype, "chapterDelaySeconds", void 0);
__decorate([
    (0, typeorm_1.Column)('float', { nullable: true, default: 2.0 }),
    __metadata("design:type", Number)
], Profile.prototype, "chapterGapDurationSeconds", void 0);
__decorate([
    (0, typeorm_1.Column)('float', { nullable: true, default: 1.0 }),
    __metadata("design:type", Number)
], Profile.prototype, "chunkDelaySeconds", void 0);
__decorate([
    (0, typeorm_1.Column)('integer', { nullable: true }),
    __metadata("design:type", Boolean)
], Profile.prototype, "autoGenerateSounds", void 0);
__decorate([
    (0, typeorm_1.Column)('integer', { nullable: true }),
    __metadata("design:type", Boolean)
], Profile.prototype, "autoGenerateMusic", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true, default: 'elevenlabs' }),
    __metadata("design:type", String)
], Profile.prototype, "musicProvider", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true, default: 'elevenlabs' }),
    __metadata("design:type", String)
], Profile.prototype, "soundEffectProvider", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true, default: 'openai' }),
    __metadata("design:type", String)
], Profile.prototype, "embeddingsProvider", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true, default: 'text-embedding-3-small' }),
    __metadata("design:type", String)
], Profile.prototype, "embeddingsModel", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true, default: 'openai' }),
    __metadata("design:type", String)
], Profile.prototype, "scriptProvider", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "scriptSettings", void 0);
__decorate([
    (0, typeorm_1.Column)('integer', { nullable: true }),
    __metadata("design:type", Boolean)
], Profile.prototype, "disableImageGeneration", void 0);
__decorate([
    (0, typeorm_1.Column)('integer', { nullable: true }),
    __metadata("design:type", Boolean)
], Profile.prototype, "disableMusicGeneration", void 0);
__decorate([
    (0, typeorm_1.Column)('integer', { nullable: true }),
    __metadata("design:type", Boolean)
], Profile.prototype, "disableSoundGeneration", void 0);
__decorate([
    (0, typeorm_1.Column)('float', { nullable: true, default: 120 }),
    __metadata("design:type", Number)
], Profile.prototype, "channelIntroDurationSeconds", void 0);
__decorate([
    (0, typeorm_1.Column)('float', { nullable: true, default: 120 }),
    __metadata("design:type", Number)
], Profile.prototype, "channelOutroDurationSeconds", void 0);
__decorate([
    (0, typeorm_1.Column)('float', { nullable: true, default: 165 }),
    __metadata("design:type", Number)
], Profile.prototype, "wordsPerMinute", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: false, default: 'google-veo' }),
    __metadata("design:type", String)
], Profile.prototype, "videoProvider", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "videoSettings", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "openaiSettings", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: false, default: 'standard' }),
    __metadata("design:type", String)
], Profile.prototype, "videoStyle", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Profile.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Profile.prototype, "updatedAt", void 0);
exports.Profile = Profile = __decorate([
    (0, typeorm_1.Entity)('profiles')
], Profile);
//# sourceMappingURL=Profile.js.map