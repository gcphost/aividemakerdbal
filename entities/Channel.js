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
let Channel = class Channel {
};
__decorate([
    PrimaryColumn('varchar'),
    __metadata("design:type", String)
], Channel.prototype, "_id", void 0);
__decorate([
    Column('varchar'),
    __metadata("design:type", String)
], Channel.prototype, "userId", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], Channel.prototype, "profileId", void 0);
__decorate([
    Column('varchar'),
    __metadata("design:type", String)
], Channel.prototype, "name", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], Channel.prototype, "description", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], Channel.prototype, "customUrl", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], Channel.prototype, "youtubeChannelId", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], Channel.prototype, "youtubeChannelUrl", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], Channel.prototype, "youtubeChannelTitle", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], Channel.prototype, "youtubeChannelDescription", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], Channel.prototype, "youtubeChannelThumbnail", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], Channel.prototype, "youtubeChannelBanner", void 0);
__decorate([
    Column('varchar', { default: 0 }),
    __metadata("design:type", Number)
], Channel.prototype, "subscriberCount", void 0);
__decorate([
    Column('varchar', { default: 0 }),
    __metadata("design:type", Number)
], Channel.prototype, "videoCount", void 0);
__decorate([
    Column('varchar', { default: 0 }),
    __metadata("design:type", Number)
], Channel.prototype, "viewCount", void 0);
__decorate([
    Column('varchar', { default: false }),
    __metadata("design:type", Boolean)
], Channel.prototype, "isConnected", void 0);
__decorate([
    Column('varchar', { type: 'text', nullable: true }),
    __metadata("design:type", String)
], Channel.prototype, "accessToken", void 0);
__decorate([
    Column('varchar', { type: 'text', nullable: true }),
    __metadata("design:type", String)
], Channel.prototype, "refreshToken", void 0);
__decorate([
    Column('varchar', { type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Channel.prototype, "tokenExpiresAt", void 0);
__decorate([
    Column('varchar', { default: 'unlisted' }),
    __metadata("design:type", String)
], Channel.prototype, "defaultPrivacyStatus", void 0);
__decorate([
    Column('varchar', { default: false }),
    __metadata("design:type", Boolean)
], Channel.prototype, "defaultMadeForKids", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Channel.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Channel.prototype, "updatedAt", void 0);
Channel = __decorate([
    Entity('channels')
], Channel);
export { Channel };
//# sourceMappingURL=Channel.js.map