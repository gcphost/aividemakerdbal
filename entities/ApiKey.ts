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
    return encrypt(value);
  },
  from: (value: string | null): string | null => {
    // Decrypt when reading from database
    if (value === null || value === undefined) {
      return null;
    }
    return decrypt(value);
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

  @Column('varchar', { default: true })
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
