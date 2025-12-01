import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ValueTransformer } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { encrypt, decrypt } from '../utils/secure-crypto';

/**
 * Value transformer for encrypting/decrypting API keys and secrets
 */
const apiKeyTransformer: ValueTransformer = {
  to: (value: string | null): string | null => {
    // Encrypt when saving to database
    if (value === null || value === undefined) {
      return null;
    }
    // If value is already encrypted (contains colons from iv:encrypted:authTag format), don't re-encrypt
    if (value.includes(':') && value.split(':').length === 3) {
      return value;
    }
    return encrypt(value);
  },
  from: (value: string | null): string | null => {
    // Decrypt when reading from database
    if (value === null || value === undefined) {
      return null;
    }
    // If value doesn't look encrypted (no colons), return as-is
    if (!value.includes(':')) {
      return value;
    }
    try {
      return decrypt(value);
    } catch (error: any) {
      // Decryption failed - likely encryption key mismatch (e.g., moved to different machine)
      // Return null so the app can still load, but the key will need to be re-entered
      console.warn(`[ApiKey] Failed to decrypt API key: ${error.message}. This usually means the encryption key changed (e.g., moved to different machine). Please re-enter your API keys.`);
      return null;
    }
  }
};

@Entity('api_keys')
@Index(['userId', 'service'], { unique: true })
export class ApiKey extends BaseEntity {
  @PrimaryColumn('varchar')
  _id!: string;

  @Column('varchar')
  userId!: string;

  @Column('varchar')
  service!: string;

  @Column('varchar', { nullable: true, transformer: apiKeyTransformer })
  apiKey?: string;

  @Column('varchar', { nullable: true, transformer: apiKeyTransformer })
  apiSecret?: string;

  @Column('varchar', { nullable: true })
  apiUrl?: string;

  @Column('varchar', { nullable: true })
  model?: string;

  @Column({ type: 'boolean', default: true })
  isActive!: boolean;

  @Column({ type: 'text', nullable: true })
  config?: string;

  @Column({ type: 'datetime', nullable: true })
  lastUsedAt?: Date;

  @Column('varchar', { nullable: true })
  usageCount?: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
