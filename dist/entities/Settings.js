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
exports.Settings = void 0;
const typeorm_1 = require("typeorm");
const BaseEntity_1 = require("./BaseEntity");
const secure_crypto_1 = require("../utils/secure-crypto");
/**
 * Value transformer for encrypting/decrypting JSON system usage data
 */
const systemUsageTransformer = {
    to: (value) => {
        // Encrypt when saving to database
        if (value === null || value === undefined) {
            return null;
        }
        // If value is already encrypted (contains colons from iv:encrypted:authTag format), don't re-encrypt
        if (typeof value === "string" && value.includes(":") && value.split(":").length === 3) {
            return value;
        }
        return (0, secure_crypto_1.encrypt)(JSON.stringify(value));
    },
    from: (value) => {
        // Decrypt when reading from database
        if (value === null || value === undefined) {
            return null;
        }
        // If value doesn't look encrypted (no colons), return as-is
        if (!value.includes(":")) {
            return value;
        }
        try {
            const decrypted = (0, secure_crypto_1.decrypt)(value);
            return JSON.parse(decrypted);
        }
        catch (error) {
            // Decryption failed - likely encryption key mismatch (e.g., moved to different machine)
            console.warn(`[Settings] Failed to decrypt system usage: ${error.message}. This usually means the encryption key changed (e.g., moved to different machine).`);
            return null;
        }
    },
};
let Settings = class Settings extends BaseEntity_1.BaseEntity {
    _id;
    userId;
    theme;
    notifications;
    emailNotifications;
    language;
    timezone;
    preferences;
    systemUsage; // Encrypted JSON: { totalVideosCreated, totalFilesCreated, maxVideos: 5, maxFiles: 100 }
    createdAt;
    updatedAt;
};
exports.Settings = Settings;
__decorate([
    (0, typeorm_1.PrimaryColumn)("varchar"),
    __metadata("design:type", String)
], Settings.prototype, "_id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar"),
    __metadata("design:type", String)
], Settings.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { nullable: true }),
    __metadata("design:type", String)
], Settings.prototype, "theme", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: true }),
    __metadata("design:type", Boolean)
], Settings.prototype, "notifications", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: true }),
    __metadata("design:type", Boolean)
], Settings.prototype, "emailNotifications", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { default: "en" }),
    __metadata("design:type", String)
], Settings.prototype, "language", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { default: "UTC" }),
    __metadata("design:type", String)
], Settings.prototype, "timezone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Settings.prototype, "preferences", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { nullable: true, transformer: systemUsageTransformer }),
    __metadata("design:type", Object)
], Settings.prototype, "systemUsage", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Settings.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Settings.prototype, "updatedAt", void 0);
exports.Settings = Settings = __decorate([
    (0, typeorm_1.Entity)("settings")
], Settings);
//# sourceMappingURL=Settings.js.map