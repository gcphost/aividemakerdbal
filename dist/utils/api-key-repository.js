"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiKeyRepository = void 0;
const secure_crypto_1 = require("./secure-crypto");
/**
 * Custom repository for ApiKey that handles encryption/decryption manually
 * TypeORM transformers don't work reliably with SQLite, so we handle it here
 */
class ApiKeyRepository {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    /**
     * Find one API key and decrypt it
     */
    async findOneDecrypted(options) {
        const key = await this.repo.findOne(options);
        if (!key)
            return null;
        return this.decryptKey(key);
    }
    /**
     * Find all API keys for a user and decrypt them
     */
    async findAllDecrypted(options) {
        const keys = await this.repo.find(options);
        return keys.map(k => this.decryptKey(k));
    }
    /**
     * Save an API key (encrypt before saving)
     */
    async saveEncrypted(key) {
        const toSave = { ...key };
        // Encrypt sensitive fields
        if (toSave.apiKey) {
            toSave.apiKey = (0, secure_crypto_1.encrypt)(toSave.apiKey);
        }
        if (toSave.apiSecret) {
            toSave.apiSecret = (0, secure_crypto_1.encrypt)(toSave.apiSecret);
        }
        return this.repo.save(toSave);
    }
    /**
     * Decrypt a single key entity
     */
    decryptKey(key) {
        try {
            if (key.apiKey && key.apiKey.includes(':')) {
                // Looks like encrypted format (contains colons for iv:data:tag)
                try {
                    key.apiKey = (0, secure_crypto_1.decrypt)(key.apiKey);
                }
                catch (e) {
                    console.error('[ApiKeyRepository] Failed to decrypt apiKey:', e);
                    // Leave it as-is if decryption fails
                }
            }
            if (key.apiSecret && key.apiSecret.includes(':')) {
                try {
                    key.apiSecret = (0, secure_crypto_1.decrypt)(key.apiSecret);
                }
                catch (e) {
                    console.error('[ApiKeyRepository] Failed to decrypt apiSecret:', e);
                }
            }
        }
        catch (e) {
            console.error('[ApiKeyRepository] Error decrypting key:', e);
        }
        return key;
    }
    // Delegate other methods to the underlying repository
    async find(options) {
        return this.repo.find(options);
    }
    async findOne(options) {
        return this.repo.findOne(options);
    }
    async save(entity) {
        return this.repo.save(entity);
    }
    async delete(options) {
        return this.repo.delete(options);
    }
}
exports.ApiKeyRepository = ApiKeyRepository;
//# sourceMappingURL=api-key-repository.js.map