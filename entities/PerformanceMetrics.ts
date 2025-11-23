import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity('performance_metrics')
export class PerformanceMetrics extends BaseEntity {
  @PrimaryColumn('varchar')
  _id!: string;

  @Column('varchar')
  userId!: string;

  @Column({ type: 'date' })
  date!: string;

  @Column('varchar')
  metric!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  value!: number;

  @Column('varchar', { nullable: true })
  unit?: string;

  @Column({ type: 'text', nullable: true })
  metadata?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
