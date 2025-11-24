import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity('usage')
export class Usage extends BaseEntity {
  @PrimaryColumn('varchar')
  _id!: string;

  @Column('varchar')
  userId!: string;

  @Column({ type: 'date' })
  date!: string;

  @Column('varchar', { nullable: true })
  videoId?: string;

  @Column('varchar')
  service!: string;

  @Column('varchar')
  action!: string;

  @Column('varchar', { nullable: true })
  serviceType?: string;

  @Column('varchar', { nullable: true })
  provider?: string;

  @Column('varchar', { nullable: true })
  operation?: string;

  @Column('varchar', { nullable: true })
  model?: string;

  @Column({ type: 'integer', nullable: true })
  tokens?: number;

  @Column({ type: 'integer', nullable: true })
  characters?: number;

  @Column({ type: 'integer', nullable: true })
  images?: number;

  @Column({ type: 'real', nullable: true })
  duration?: number;

  @Column({ type: 'decimal', precision: 10, scale: 4, default: 0 })
  cost!: number;

  @Column('varchar', { default: 'USD' })
  currency!: string;

  @Column({ type: 'text', nullable: true })
  metadata?: string;

  @Column({ type: 'integer', nullable: true })
  inputTokens?: number;

  @Column({ type: 'integer', nullable: true })
  outputTokens?: number;

  @Column({ type: 'integer', nullable: true })
  durationMs?: number;

  @Column({ type: 'integer', nullable: true })
  fileSize?: number;

  // New fields for better tracking
  @Column({ type: 'text', nullable: true })
  prompt?: string;

  @Column({ type: 'text', nullable: true })
  response?: string;

  @Column('varchar', { nullable: true })
  fileId?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
