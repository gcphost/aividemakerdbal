import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity('files')
export class File extends BaseEntity {
  @PrimaryColumn('varchar')
  _id!: string;

  @Column('varchar')
  userId!: string;

  @Column('varchar')
  filename!: string;

  @Column('varchar', { nullable: true })
  mimeType?: string;

  @Column('varchar')
  size!: number;

  @Column('varchar', { nullable: true })
  path?: string;

  @Column('varchar', { nullable: true })
  url?: string;

  @Column('varchar', { nullable: true })
  thumbnailUrl?: string;

  @Column('varchar', { nullable: true })
  publicUrl?: string;

  @Column('varchar', { default: 'draft' })
  status!: "draft" | "processing" | "ready";

  @Column('varchar', { nullable: true })
  type?: string;

  @Column('varchar', { nullable: true })
  category?: string;

  @Column('varchar')
  title!: string;

  @Column('varchar', { nullable: true })
  description?: string;

  @Column('varchar', { nullable: true })
  prompt?: string;

  @Column('varchar', { nullable: true })
  volume?: string;

  @Column('varchar', { nullable: true })
  loop?: string;

  @Column('real', { nullable: true })
  duration?: number; // Duration in seconds for audio/video files

  @Column('varchar', { nullable: true })
  hash?: string; // SHA-256 hash for deduplication

  @Column({ type: 'text', nullable: true })
  metadata?: string;

  @Column({ type: 'text', nullable: true })
  vectorEmbedding?: string;

  @Column({ type: 'text', nullable: true })
  versions?: string;

  @Column({ type: 'text', nullable: true })
  references?: string;

  // Versioning fields
  @Column('integer', { nullable: true, default: 1 })
  versionNumber?: number;

  @Column('varchar', { nullable: true })
  parentVersionId?: string;

  @Column('varchar', { nullable: true })
  versionChainId?: string;

  @Column('boolean', { nullable: true, default: true })
  isCurrentVersion?: boolean;

  @Column({ type: 'text', nullable: true })
  versionChange?: string;

  @Column('varchar', { default: false })
  isPublic!: boolean;

  @Column({ type: 'datetime', nullable: true })
  expiresAt?: Date;

  @Column({ type: 'datetime', nullable: true })
  lastAccessedAt?: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
