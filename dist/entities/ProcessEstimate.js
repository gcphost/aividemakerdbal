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
exports.ProcessEstimate = void 0;
const typeorm_1 = require("typeorm");
const BaseEntity_1 = require("./BaseEntity");
let ProcessEstimate = class ProcessEstimate extends BaseEntity_1.BaseEntity {
    _id;
    userId;
    processType;
    // Model-level performance estimate fields (for calculateAllEstimates)
    serviceType; // ServiceType enum: "tts", "image", "ai", etc.
    provider; // e.g., "openai", "gemini"
    model; // e.g., "tts-1", "gpt-4o-mini"
    operation; // e.g., "generateSpeech", "generateImage"
    timePerUnit; // milliseconds per unit (character, image, etc.)
    unitType; // UnitType enum: "character", "image", "second", etc.
    sampleCount; // Number of samples used to calculate this estimate
    lastCalculated; // When this estimate was last calculated
    // Per-process estimate fields (existing)
    videoId;
    chapterId;
    fileId;
    estimatedDurationMs;
    estimatedCost;
    currency;
    breakdown;
    expiresAt;
    createdAt;
    updatedAt;
};
exports.ProcessEstimate = ProcessEstimate;
__decorate([
    (0, typeorm_1.PrimaryColumn)('varchar'),
    __metadata("design:type", String)
], ProcessEstimate.prototype, "_id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], ProcessEstimate.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], ProcessEstimate.prototype, "processType", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", String)
], ProcessEstimate.prototype, "serviceType", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", String)
], ProcessEstimate.prototype, "provider", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", String)
], ProcessEstimate.prototype, "model", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", String)
], ProcessEstimate.prototype, "operation", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], ProcessEstimate.prototype, "timePerUnit", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", String)
], ProcessEstimate.prototype, "unitType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', nullable: true }),
    __metadata("design:type", Number)
], ProcessEstimate.prototype, "sampleCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], ProcessEstimate.prototype, "lastCalculated", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", String)
], ProcessEstimate.prototype, "videoId", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", String)
], ProcessEstimate.prototype, "chapterId", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", String)
], ProcessEstimate.prototype, "fileId", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", Number)
], ProcessEstimate.prototype, "estimatedDurationMs", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", Number)
], ProcessEstimate.prototype, "estimatedCost", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { default: 'USD', nullable: true }),
    __metadata("design:type", String)
], ProcessEstimate.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ProcessEstimate.prototype, "breakdown", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], ProcessEstimate.prototype, "expiresAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ProcessEstimate.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ProcessEstimate.prototype, "updatedAt", void 0);
exports.ProcessEstimate = ProcessEstimate = __decorate([
    (0, typeorm_1.Entity)('process_estimates')
], ProcessEstimate);
//# sourceMappingURL=ProcessEstimate.js.map