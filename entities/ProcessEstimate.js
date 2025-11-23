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
let ProcessEstimate = class ProcessEstimate {
};
__decorate([
    PrimaryColumn('varchar'),
    __metadata("design:type", String)
], ProcessEstimate.prototype, "_id", void 0);
__decorate([
    Column('varchar'),
    __metadata("design:type", String)
], ProcessEstimate.prototype, "userId", void 0);
__decorate([
    Column('varchar'),
    __metadata("design:type", String)
], ProcessEstimate.prototype, "processType", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], ProcessEstimate.prototype, "videoId", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], ProcessEstimate.prototype, "chapterId", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], ProcessEstimate.prototype, "fileId", void 0);
__decorate([
    Column('varchar'),
    __metadata("design:type", Number)
], ProcessEstimate.prototype, "estimatedDurationMs", void 0);
__decorate([
    Column('varchar'),
    __metadata("design:type", Number)
], ProcessEstimate.prototype, "estimatedCost", void 0);
__decorate([
    Column('varchar', { default: 'USD' }),
    __metadata("design:type", String)
], ProcessEstimate.prototype, "currency", void 0);
__decorate([
    Column('varchar', { type: 'text', nullable: true }),
    __metadata("design:type", String)
], ProcessEstimate.prototype, "breakdown", void 0);
__decorate([
    Column('varchar', { type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], ProcessEstimate.prototype, "expiresAt", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], ProcessEstimate.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], ProcessEstimate.prototype, "updatedAt", void 0);
ProcessEstimate = __decorate([
    Entity('process_estimates')
], ProcessEstimate);
export { ProcessEstimate };
//# sourceMappingURL=ProcessEstimate.js.map