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
let Settings = class Settings {
};
__decorate([
    PrimaryColumn('varchar'),
    __metadata("design:type", String)
], Settings.prototype, "_id", void 0);
__decorate([
    Column('varchar'),
    __metadata("design:type", String)
], Settings.prototype, "userId", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], Settings.prototype, "theme", void 0);
__decorate([
    Column('varchar', { default: true }),
    __metadata("design:type", Boolean)
], Settings.prototype, "notifications", void 0);
__decorate([
    Column('varchar', { default: true }),
    __metadata("design:type", Boolean)
], Settings.prototype, "emailNotifications", void 0);
__decorate([
    Column('varchar', { default: 'en' }),
    __metadata("design:type", String)
], Settings.prototype, "language", void 0);
__decorate([
    Column('varchar', { default: 'UTC' }),
    __metadata("design:type", String)
], Settings.prototype, "timezone", void 0);
__decorate([
    Column('varchar', { type: 'text', nullable: true }),
    __metadata("design:type", String)
], Settings.prototype, "preferences", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Settings.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Settings.prototype, "updatedAt", void 0);
Settings = __decorate([
    Entity('settings')
], Settings);
export { Settings };
//# sourceMappingURL=Settings.js.map