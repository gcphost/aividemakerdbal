"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEntity = void 0;
const typeorm_1 = require("typeorm");
const crypto_1 = require("crypto");
// @ts-expect-error - TypeORM's BaseEntity has findOne with different signature, but we need our own implementation
class BaseEntity extends typeorm_1.BaseEntity {
    // MongoDB-style findOne method
    static async findOne(options) {
        // Get the DataSource and repository
        const { AppDataSource } = await Promise.resolve().then(() => __importStar(require('../data-source')));
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }
        const repository = AppDataSource.getRepository(this);
        return repository.findOne(options);
    }
    // MongoDB-style find method
    static async find(options) {
        // Get the DataSource and repository
        const { AppDataSource } = await Promise.resolve().then(() => __importStar(require('../data-source')));
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }
        const repository = AppDataSource.getRepository(this);
        return repository.find(options);
    }
    // MongoDB-style create method (wrapper for TypeORM's create)
    static create(data) {
        // Use TypeORM's create method
        return this.create(data);
    }
    // MongoDB-style findById method
    static async findById(id) {
        return this.findOne({ where: { _id: id } });
    }
    // MongoDB-style findByIdAndUpdate method
    static async findByIdAndUpdate(id, update, options = {}) {
        const entity = await this.findOne({ where: { _id: id } });
        if (!entity) {
            return null;
        }
        // Handle $set operator
        const updateData = update.$set || update;
        // Apply updates
        Object.assign(entity, updateData);
        // Save and return
        await entity.save();
        return entity;
    }
    // MongoDB-style findByIdAndDelete method
    static async findByIdAndDelete(id) {
        const entity = await this.findOne({ where: { _id: id } });
        if (!entity) {
            return null;
        }
        await this.delete({ _id: id });
        return entity;
    }
    // MongoDB-style findOneAndUpdate with filter and update object
    static async findOneAndUpdate(filter, update, options = {}) {
        // Handle $set operator
        const updateData = update.$set || update;
        const entity = await this.findOne({ where: filter });
        if (!entity) {
            return null;
        }
        // Apply updates
        Object.assign(entity, updateData);
        // Save and return
        await entity.save();
        return entity;
    }
    // MongoDB-style findOneAndDelete with filter
    static async findOneAndDelete(filter) {
        const entity = await this.findOne({ where: filter });
        if (!entity) {
            return null;
        }
        await this.delete(filter);
        return entity;
    }
    // MongoDB-style createAndSave method (static wrapper that creates and saves)
    static async createAndSave(data) {
        // If _id is not provided but processId is, use processId as _id
        if (!data._id && data.processId) {
            data._id = data.processId;
        }
        // Auto-generate _id if not provided (for entities with PrimaryColumn _id)
        if (!data._id) {
            data._id = (0, crypto_1.randomUUID)();
        }
        // Use TypeORM's create method to create instance
        const entity = this.create(data);
        // Save the entity
        return await entity.save();
    }
    // Additional MongoDB-style methods
    static async countDocuments(filter = {}) {
        return this.count({ where: filter });
    }
    static async deleteOne(filter) {
        const result = await this.delete(filter);
        return { deletedCount: result.affected ?? undefined };
    }
    static async deleteMany(filter) {
        const result = await this.delete(filter);
        return { deletedCount: result.affected ?? undefined };
    }
    // Override save to ensure proper functionality
    async save() {
        return super.save();
    }
}
exports.BaseEntity = BaseEntity;
//# sourceMappingURL=BaseEntity.js.map