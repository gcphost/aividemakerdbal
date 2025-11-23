"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEntity = void 0;
const typeorm_1 = require("typeorm");
const crypto_1 = require("crypto");
class BaseEntity extends typeorm_1.BaseEntity {
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