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
let Chapter = class Chapter {
};
__decorate([
    PrimaryColumn('varchar'),
    __metadata("design:type", String)
], Chapter.prototype, "_id", void 0);
__decorate([
    Column('varchar'),
    __metadata("design:type", String)
], Chapter.prototype, "videoId", void 0);
__decorate([
    Column('varchar'),
    __metadata("design:type", Number)
], Chapter.prototype, "chapterNumber", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], Chapter.prototype, "title", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], Chapter.prototype, "description", void 0);
__decorate([
    Column('varchar', { type: 'text', nullable: true }),
    __metadata("design:type", String)
], Chapter.prototype, "narrationScript", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", Number)
], Chapter.prototype, "startTime", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", Number)
], Chapter.prototype, "endTime", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], Chapter.prototype, "audioUrl", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], Chapter.prototype, "audioFileId", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", Number)
], Chapter.prototype, "audioDuration", void 0);
__decorate([
    Column('varchar', { type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Chapter.prototype, "audioGeneratedAt", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", Number)
], Chapter.prototype, "audioGenerationTimeMs", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], Chapter.prototype, "imagePrompt", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], Chapter.prototype, "imageUrl", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], Chapter.prototype, "imageFileId", void 0);
__decorate([
    Column('varchar', { type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Chapter.prototype, "imageGeneratedAt", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", Number)
], Chapter.prototype, "imageGenerationTimeMs", void 0);
__decorate([
    Column('varchar', { default: 'draft' }),
    __metadata("design:type", String)
], Chapter.prototype, "status", void 0);
__decorate([
    Column('varchar'),
    __metadata("design:type", String)
], Chapter.prototype, "userId", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Chapter.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Chapter.prototype, "updatedAt", void 0);
Chapter = __decorate([
    Entity('chapters')
], Chapter);
export { Chapter };
//# sourceMappingURL=Chapter.js.map