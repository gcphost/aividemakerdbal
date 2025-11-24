import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity('process_estimates')
export class ProcessEstimate extends BaseEntity {
  @PrimaryColumn('varchar')
  _id!: string;

  @Column('varchar')
  userId!: string;

  @Column('varchar')
  processType!: string;

  // Model-level performance estimate fields (for calculateAllEstimates)
  @Column('varchar', { nullable: true })
  serviceType?: string; // ServiceType enum: "tts", "image", "ai", etc.

  @Column('varchar', { nullable: true })
  provider?: string; // e.g., "openai", "gemini"

  @Column('varchar', { nullable: true })
  model?: string; // e.g., "tts-1", "gpt-4o-mini"

  @Column('varchar', { nullable: true })
  operation?: string; // e.g., "generateSpeech", "generateImage"

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  timePerUnit?: number; // milliseconds per unit (character, image, etc.)

  @Column('varchar', { nullable: true })
  unitType?: string; // UnitType enum: "character", "image", "second", etc.

  @Column({ type: 'integer', nullable: true })
  sampleCount?: number; // Number of samples used to calculate this estimate

  @Column({ type: 'datetime', nullable: true })
  lastCalculated?: Date; // When this estimate was last calculated

  // Per-process estimate fields (existing)
  @Column('varchar', { nullable: true })
  videoId?: string;

  @Column('varchar', { nullable: true })
  chapterId?: string;

  @Column('varchar', { nullable: true })
  fileId?: string;

  @Column('varchar', { nullable: true })
  estimatedDurationMs?: number;

  @Column('varchar', { nullable: true })
  estimatedCost?: number;

  @Column('varchar', { default: 'USD', nullable: true })
  currency?: string;

  @Column({ type: 'text', nullable: true })
  breakdown?: string;

  @Column({ type: 'datetime', nullable: true })
  expiresAt?: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
