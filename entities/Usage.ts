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

  @Column('varchar', { nullable: true })
  chapterId?: string;

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

  @Column('varchar', { nullable: true })
  tokens?: number;

  @Column('varchar', { nullable: true })
  characters?: number;

  @Column('varchar', { nullable: true })
  images?: number;

  @Column('varchar', { nullable: true })
  duration?: number;

  @Column({ type: 'decimal', precision: 10, scale: 4, default: 0 })
  cost!: number;

  @Column('varchar', { default: 'USD' })
  currency!: string;

  @Column({ type: 'text', nullable: true })
  metadata?: string;

  @Column('varchar', { nullable: true })
  inputTokens?: number;

  @Column('varchar', { nullable: true })
  outputTokens?: number;

  @Column('varchar', { nullable: true })
  durationMs?: number;

  @Column('varchar', { nullable: true })
  fileSize?: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
