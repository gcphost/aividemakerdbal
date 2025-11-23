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

  @Column('varchar', { nullable: true })
  videoId?: string;

  @Column('varchar', { nullable: true })
  chapterId?: string;

  @Column('varchar', { nullable: true })
  fileId?: string;

  @Column('varchar')
  estimatedDurationMs!: number;

  @Column('varchar')
  estimatedCost!: number;

  @Column('varchar', { default: 'USD' })
  currency!: string;

  @Column({ type: 'text', nullable: true })
  breakdown?: string;

  @Column({ type: 'datetime', nullable: true })
  expiresAt?: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
