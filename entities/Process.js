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
let Process = class Process {
};
__decorate([
    PrimaryColumn('varchar'),
    __metadata("design:type", String)
], Process.prototype, "_id", void 0);
__decorate([
    Column('varchar'),
    __metadata("design:type", String)
], Process.prototype, "userId", void 0);
__decorate([
    Column('varchar'),
    __metadata("design:type", String)
], Process.prototype, "type", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], Process.prototype, "videoId", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], Process.prototype, "chapterId", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], Process.prototype, "fileId", void 0);
__decorate([
    Column('varchar', { default: 'pending' }),
    __metadata("design:type", String)
], Process.prototype, "status", void 0);
__decorate([
    Column('varchar', { type: 'text', nullable: true }),
    __metadata("design:type", String)
], Process.prototype, "config", void 0);
__decorate([
    Column('varchar', { type: 'text', nullable: true }),
    __metadata("design:type", String)
], Process.prototype, "result", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", Number)
], Process.prototype, "progress", void 0);
__decorate([
    Column('varchar', { type: 'text', nullable: true }),
    __metadata("design:type", String)
], Process.prototype, "error", void 0);
__decorate([
    Column('varchar', { type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Process.prototype, "startedAt", void 0);
__decorate([
    Column('varchar', { type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Process.prototype, "completedAt", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", Number)
], Process.prototype, "durationMs", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", Number)
], Process.prototype, "pid", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Process.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Process.prototype, "updatedAt", void 0);
Process = __decorate([
    Entity('processes')
], Process);
export { Process };
//# sourceMappingURL=Process.js.map