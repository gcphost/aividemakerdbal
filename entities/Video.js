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
let Video = class Video {
};
__decorate([
    PrimaryColumn('varchar'),
    __metadata("design:type", String)
], Video.prototype, "_id", void 0);
__decorate([
    Column('varchar'),
    __metadata("design:type", String)
], Video.prototype, "subject", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], Video.prototype, "description", void 0);
__decorate([
    Column('varchar', { default: 120 }),
    __metadata("design:type", Number)
], Video.prototype, "length", void 0);
__decorate([
    Column('varchar', { default: 'draft' }),
    __metadata("design:type", String)
], Video.prototype, "status", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], Video.prototype, "youtubeId", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], Video.prototype, "generatedVideoUrl", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], Video.prototype, "generatedVideoFileId", void 0);
__decorate([
    Column('varchar', { type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Video.prototype, "videoGeneratedAt", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", Number)
], Video.prototype, "videoRenderTimeMs", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], Video.prototype, "previewVideoUrl", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], Video.prototype, "youtubeTitle", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], Video.prototype, "youtubeDescription", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], Video.prototype, "thumbnailUrl", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], Video.prototype, "thumbnailFileId", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], Video.prototype, "originalThumbnailUrl", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], Video.prototype, "originalThumbnailFileId", void 0);
__decorate([
    Column('varchar', { type: 'text', nullable: true }),
    __metadata("design:type", String)
], Video.prototype, "thumbnailDesign", void 0);
__decorate([
    Column('varchar', { type: 'text', nullable: true }),
    __metadata("design:type", String)
], Video.prototype, "thumbnailVariations", void 0);
__decorate([
    Column('varchar', { type: 'text', nullable: true }),
    __metadata("design:type", String)
], Video.prototype, "tags", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], Video.prototype, "categoryId", void 0);
__decorate([
    Column('varchar', { default: 'unlisted' }),
    __metadata("design:type", String)
], Video.prototype, "privacyStatus", void 0);
__decorate([
    Column('varchar', { default: false }),
    __metadata("design:type", Boolean)
], Video.prototype, "madeForKids", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], Video.prototype, "profileId", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], Video.prototype, "channelId", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], Video.prototype, "introPrompt", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], Video.prototype, "advertisingPrompt", void 0);
__decorate([
    Column('varchar', { default: 'standard' }),
    __metadata("design:type", String)
], Video.prototype, "videoStyle", void 0);
__decorate([
    Column('varchar', { type: 'text', nullable: true }),
    __metadata("design:type", String)
], Video.prototype, "timeline", void 0);
__decorate([
    Column('varchar'),
    __metadata("design:type", String)
], Video.prototype, "userId", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Video.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Video.prototype, "updatedAt", void 0);
Video = __decorate([
    Entity('videos')
], Video);
export { Video };
//# sourceMappingURL=Video.js.map