var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
let Profile = class Profile {
};
__decorate([
    PrimaryColumn('varchar'),
    __metadata("design:type", String)
], Profile.prototype, "_id", void 0);
__decorate([
    Column('varchar'),
    __metadata("design:type", String)
], Profile.prototype, "userId", void 0);
__decorate([
    Column('varchar'),
    __metadata("design:type", String)
], Profile.prototype, "name", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "description", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "narratorPromptTemplate", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "introScriptTemplate", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "outroScriptTemplate", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "imageStylePrompt", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "imageDescriptionPrompt", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "soundGenerationPrompt", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "musicGenerationPrompt", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "chapterGenerationPrompt", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "advertisingScriptPrompt", void 0);
__decorate([
    Column('varchar', { default: true }),
    __metadata("design:type", Boolean)
], Profile.prototype, "enableMidstoryCTA", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "chapterTransitionPrompt", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "antiAiPrompt", void 0);
__decorate([
    Column('varchar', { default: 'huggingface' }),
    __metadata("design:type", String)
], Profile.prototype, "imageProvider", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "ttsProvider", void 0);
__decorate([
    Column('varchar', { default: false }),
    __metadata("design:type", Boolean)
], Profile.prototype, "ttsUseEmotionalTags", void 0);
__decorate([
    Column('varchar', { type: 'text', nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "ttsSettings", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "ttsVoice", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "ttsModel", void 0);
__decorate([
    Column('varchar', { default: 'google-veo' }),
    __metadata("design:type", String)
], Profile.prototype, "videoProvider", void 0);
__decorate([
    Column('varchar', { type: 'text', nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "videoSettings", void 0);
__decorate([
    Column('varchar', { default: 'standard' }),
    __metadata("design:type", String)
], Profile.prototype, "videoStyle", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Profile.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Profile.prototype, "updatedAt", void 0);
Profile = __decorate([
    Entity('profiles')
], Profile);
export { Profile };
//# sourceMappingURL=Profile.js.map