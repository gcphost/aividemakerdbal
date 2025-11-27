import { Repository } from 'typeorm';
import { ApiKey } from '../entities/ApiKey';
import { decrypt, encrypt } from './secure-crypto';

/**
 * Custom repository for ApiKey that handles encryption/decryption manually
 * TypeORM transformers don't work reliably with SQLite, so we handle it here
 */
export class ApiKeyRepository {
  constructor(private repo: Repository<ApiKey>) {}

  /**
   * Find one API key and decrypt it
   */
  async findOneDecrypted(options: any): Promise<ApiKey | null> {
    const key = await this.repo.findOne(options);
    if (!key) return null;

    return this.decryptKey(key);
  }

  /**
   * Find all API keys for a user and decrypt them
   */
  async findAllDecrypted(options: any): Promise<ApiKey[]> {
    const keys = await this.repo.find(options);
    return keys.map(k => this.decryptKey(k));
  }

  /**
   * Save an API key (encrypt before saving)
   */
  async saveEncrypted(key: Partial<ApiKey>): Promise<ApiKey> {
    const toSave = { ...key };
    
    // Encrypt sensitive fields
    if (toSave.apiKey) {
      toSave.apiKey = encrypt(toSave.apiKey);
    }
    if (toSave.apiSecret) {
      toSave.apiSecret = encrypt(toSave.apiSecret);
    }

    return this.repo.save(toSave);
  }

  /**
   * Decrypt a single key entity
   */
  private decryptKey(key: ApiKey): ApiKey {
    try {
      if (key.apiKey && key.apiKey.includes(':')) {
        // Looks like encrypted format (contains colons for iv:data:tag)
        try {
          key.apiKey = decrypt(key.apiKey);
        } catch (e) {
          console.error('[ApiKeyRepository] Failed to decrypt apiKey:', e);
          // Leave it as-is if decryption fails
        }
      }

      if (key.apiSecret && key.apiSecret.includes(':')) {
        try {
          key.apiSecret = decrypt(key.apiSecret);
        } catch (e) {
          console.error('[ApiKeyRepository] Failed to decrypt apiSecret:', e);
        }
      }
    } catch (e) {
      console.error('[ApiKeyRepository] Error decrypting key:', e);
    }

    return key;
  }

  // Delegate other methods to the underlying repository
  async find(options?: any) {
    return this.repo.find(options);
  }

  async findOne(options?: any) {
    return this.repo.findOne(options);
  }

  async save(entity: any) {
    return this.repo.save(entity);
  }

  async delete(options?: any) {
    return this.repo.delete(options);
  }
}














