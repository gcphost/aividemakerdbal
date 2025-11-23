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
let File = class File {
};
__decorate([
    PrimaryColumn('varchar'),
    __metadata("design:type", String)
], File.prototype, "_id", void 0);
__decorate([
    Column('varchar'),
    __metadata("design:type", String)
], File.prototype, "userId", void 0);
__decorate([
    Column('varchar'),
    __metadata("design:type", String)
], File.prototype, "filename", void 0);
__decorate([
    Column('varchar'),
    __metadata("design:type", String)
], File.prototype, "originalName", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], File.prototype, "mimeType", void 0);
__decorate([
    Column('varchar'),
    __metadata("design:type", Number)
], File.prototype, "size", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], File.prototype, "path", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], File.prototype, "url", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], File.prototype, "thumbnailUrl", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], File.prototype, "publicUrl", void 0);
__decorate([
    Column('varchar', { default: 'draft' }),
    __metadata("design:type", String)
], File.prototype, "status", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], File.prototype, "type", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], File.prototype, "category", void 0);
__decorate([
    Column('varchar', { type: 'text', nullable: true }),
    __metadata("design:type", String)
], File.prototype, "metadata", void 0);
__decorate([
    Column('varchar', { type: 'text', nullable: true }),
    __metadata("design:type", String)
], File.prototype, "vectorEmbedding", void 0);
__decorate([
    Column('varchar', { type: 'text', nullable: true }),
    __metadata("design:type", String)
], File.prototype, "versions", void 0);
__decorate([
    Column('varchar', { default: false }),
    __metadata("design:type", Boolean)
], File.prototype, "isPublic", void 0);
__decorate([
    Column('varchar', { type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], File.prototype, "expiresAt", void 0);
__decorate([
    Column('varchar', { type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], File.prototype, "lastAccessedAt", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], File.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], File.prototype, "updatedAt", void 0);
File = __decorate([
    Entity('files')
], File);
export { File };
//# sourceMappingURL=File.js.map