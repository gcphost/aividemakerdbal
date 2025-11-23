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
let Usage = class Usage {
};
__decorate([
    PrimaryColumn('varchar'),
    __metadata("design:type", String)
], Usage.prototype, "_id", void 0);
__decorate([
    Column('varchar'),
    __metadata("design:type", String)
], Usage.prototype, "userId", void 0);
__decorate([
    Column('varchar', { type: 'date' }),
    __metadata("design:type", String)
], Usage.prototype, "date", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], Usage.prototype, "videoId", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], Usage.prototype, "chapterId", void 0);
__decorate([
    Column('varchar'),
    __metadata("design:type", String)
], Usage.prototype, "service", void 0);
__decorate([
    Column('varchar'),
    __metadata("design:type", String)
], Usage.prototype, "action", void 0);
__decorate([
    Column('varchar', { type: 'decimal', precision: 10, scale: 4, default: 0 }),
    __metadata("design:type", Number)
], Usage.prototype, "cost", void 0);
__decorate([
    Column('varchar', { default: 'USD' }),
    __metadata("design:type", String)
], Usage.prototype, "currency", void 0);
__decorate([
    Column('varchar', { type: 'text', nullable: true }),
    __metadata("design:type", String)
], Usage.prototype, "metadata", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", Number)
], Usage.prototype, "inputTokens", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", Number)
], Usage.prototype, "outputTokens", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", Number)
], Usage.prototype, "durationMs", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", Number)
], Usage.prototype, "fileSize", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Usage.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Usage.prototype, "updatedAt", void 0);
Usage = __decorate([
    Entity('usage')
], Usage);
export { Usage };
//# sourceMappingURL=Usage.js.map