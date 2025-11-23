import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';

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

  @Column({ type: 'text', nullable: true })
  accessToken?: string;

  @Column({ type: 'text', nullable: true })
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
