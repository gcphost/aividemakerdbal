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
exports.BackgroundAudio = void 0;
const typeorm_1 = require("typeorm");
const BaseEntity_1 = require("./BaseEntity");
let BackgroundAudio = class BackgroundAudio extends BaseEntity_1.BaseEntity {
    _id;
    userId;
    name;
    title;
    description;
    genre;
    mood;
    tempo;
    instrumental;
    audioUrl;
    audioFileId;
    duration;
    volume;
    loop;
    searchTerm;
    prompt;
    status;
    audioGeneratedAt;
    audioGenerationTimeMs;
    createdAt;
    updatedAt;
};
exports.BackgroundAudio = BackgroundAudio;
__decorate([
    (0, typeorm_1.PrimaryColumn)('varchar'),
    __metadata("design:type", String)
], BackgroundAudio.prototype, "_id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], BackgroundAudio.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], BackgroundAudio.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", String)
], BackgroundAudio.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", String)
], BackgroundAudio.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", String)
], BackgroundAudio.prototype, "genre", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", String)
], BackgroundAudio.prototype, "mood", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", String)
], BackgroundAudio.prototype, "tempo", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { default: false }),
    __metadata("design:type", Boolean)
], BackgroundAudio.prototype, "instrumental", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", String)
], BackgroundAudio.prototype, "audioUrl", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", String)
], BackgroundAudio.prototype, "audioFileId", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", Number)
], BackgroundAudio.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { default: 70 }),
    __metadata("design:type", Number)
], BackgroundAudio.prototype, "volume", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { default: false }),
    __metadata("design:type", Boolean)
], BackgroundAudio.prototype, "loop", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", String)
], BackgroundAudio.prototype, "searchTerm", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", String)
], BackgroundAudio.prototype, "prompt", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { default: 'draft' }),
    __metadata("design:type", String)
], BackgroundAudio.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], BackgroundAudio.prototype, "audioGeneratedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", Number)
], BackgroundAudio.prototype, "audioGenerationTimeMs", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], BackgroundAudio.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], BackgroundAudio.prototype, "updatedAt", void 0);
exports.BackgroundAudio = BackgroundAudio = __decorate([
    (0, typeorm_1.Entity)('background_audio')
], BackgroundAudio);
//# sourceMappingURL=BackgroundAudio.js.map