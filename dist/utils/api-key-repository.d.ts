import { Repository } from 'typeorm';
import { ApiKey } from '../entities/ApiKey';
/**
 * Custom repository for ApiKey that handles encryption/decryption manually
 * TypeORM transformers don't work reliably with SQLite, so we handle it here
 */
export declare class ApiKeyRepository {
    private repo;
    constructor(repo: Repository<ApiKey>);
    /**
     * Find one API key and decrypt it
     */
    findOneDecrypted(options: any): Promise<ApiKey | null>;
    /**
     * Find all API keys for a user and decrypt them
     */
    findAllDecrypted(options: any): Promise<ApiKey[]>;
    /**
     * Save an API key (encrypt before saving)
     */
    saveEncrypted(key: Partial<ApiKey>): Promise<ApiKey>;
    /**
     * Decrypt a single key entity
     */
    private decryptKey;
    find(options?: any): Promise<ApiKey[]>;
    findOne(options?: any): Promise<ApiKey | null>;
    save(entity: any): Promise<any>;
    delete(options?: any): Promise<import("typeorm").DeleteResult>;
}
//# sourceMappingURL=api-key-repository.d.ts.map