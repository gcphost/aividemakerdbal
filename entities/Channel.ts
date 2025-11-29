import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ValueTransformer } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { encrypt, decrypt } from '../utils/secure-crypto';

/**
 * Value transformer for encrypting/decrypting tokens
 */
const tokenTransformer: ValueTransformer = {
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

@Entity('channels')
export class Channel extends BaseEntity {
  @PrimaryColumn('varchar')
  _id!: string;

  @Column('varchar')
  userId!: string;

  @Column('varchar', { nullable: true })
  profileId?: string;

  @Column('varchar')
  name!: string;

  @Column('varchar', { nullable: true })
  description?: string;

  @Column('text', { nullable: true })
  descriptionFooter?: string;

  @Column('varchar', { nullable: true })
  tagline?: string;

  @Column('varchar', { nullable: true })
  youtubeName?: string;

  @Column('varchar', { nullable: true })
  customUrl?: string;

  @Column('varchar', { nullable: true })
  youtubeChannelId?: string;

  @Column('varchar', { nullable: true })
  youtubeChannelUrl?: string;

  @Column('varchar', { nullable: true })
  youtubeChannelTitle?: string;

  @Column('varchar', { nullable: true })
  youtubeChannelDescription?: string;

  @Column('varchar', { nullable: true })
  youtubeChannelThumbnail?: string;

  @Column('varchar', { nullable: true })
  youtubeChannelBanner?: string;

  @Column('varchar', { default: 0 })
  subscriberCount!: number;

  @Column('varchar', { default: 0 })
  videoCount!: number;

  @Column('varchar', { default: 0 })
  viewCount!: number;

  @Column('varchar', { default: false })
  isConnected!: boolean;

  @Column({ type: 'text', nullable: true, transformer: tokenTransformer })
  accessToken?: string;

  @Column({ type: 'text', nullable: true, transformer: tokenTransformer })
  refreshToken?: string;

  @Column({ type: 'datetime', nullable: true })
  tokenExpiresAt?: Date;

  @Column('varchar', { default: 'unlisted' })
  defaultPrivacyStatus!: "public" | "unlisted" | "private";

  @Column('varchar', { default: false })
  defaultMadeForKids!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
