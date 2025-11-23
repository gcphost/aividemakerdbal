var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
let ApiKey = class ApiKey {
};
__decorate([
    PrimaryColumn('varchar'),
    __metadata("design:type", String)
], ApiKey.prototype, "_id", void 0);
__decorate([
    Column('varchar'),
    __metadata("design:type", String)
], ApiKey.prototype, "userId", void 0);
__decorate([
    Column('varchar'),
    __metadata("design:type", String)
], ApiKey.prototype, "service", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], ApiKey.prototype, "apiKey", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], ApiKey.prototype, "apiSecret", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], ApiKey.prototype, "apiUrl", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], ApiKey.prototype, "model", void 0);
__decorate([
    Column('varchar', { default: true }),
    __metadata("design:type", Boolean)
], ApiKey.prototype, "isActive", void 0);
__decorate([
    Column('varchar', { type: 'text', nullable: true }),
    __metadata("design:type", String)
], ApiKey.prototype, "config", void 0);
__decorate([
    Column('varchar', { type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], ApiKey.prototype, "lastUsedAt", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", Number)
], ApiKey.prototype, "usageCount", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], ApiKey.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], ApiKey.prototype, "updatedAt", void 0);
ApiKey = __decorate([
    Entity('api_keys'),
    Index(['userId', 'service'], { unique: true })
], ApiKey);
export { ApiKey };
//# sourceMappingURL=ApiKey.js.map