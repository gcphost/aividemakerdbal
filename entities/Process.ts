import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity('processes')
export class Process extends BaseEntity {
  @PrimaryColumn('varchar')
  _id!: string;

  @Column('varchar', { nullable: true })
  processId?: string; // Alias for _id for MongoDB compatibility

  @Column('varchar')
  userId!: string;

  @Column('varchar')
  type!: string;

  @Column('varchar', { nullable: true })
  videoId?: string;

  @Column('varchar', { nullable: true })
  chapterId?: string;

  @Column('varchar', { nullable: true })
  fileId?: string;

  @Column('varchar', { nullable: true })
  resourceId?: string;

  @Column('varchar', { nullable: true })
  serverId?: string;

  @Column('varchar', { nullable: true })
  groupId?: string;

  @Column('varchar', { nullable: true })
  parentProcessId?: string; // Parent process ID for master/slave relationships

  @Column('boolean', { default: false })
  isMaster!: boolean; // True for master processes, false for slave processes

  @Column('varchar', { nullable: true })
  stage?: string;

  @Column({ type: 'text', nullable: true })
  message?: string;

  @Column('varchar', { nullable: true })
  currentStep?: number;

  @Column('varchar', { nullable: true })
  totalSteps?: number;

  @Column('varchar', { nullable: true })
  stepName?: string;

  @Column('varchar', { nullable: true })
  currentChapter?: number;

  @Column('varchar', { nullable: true })
  totalChapters?: number;

  @Column({ type: 'text', nullable: true })
  metadata?: string; // JSON string - parse when needed

  @Column('varchar', { default: 'pending' })
  status!: "pending" | "running" | "completed" | "failed" | "queued" | "processing";

  @Column({ type: 'text', nullable: true })
  config?: string;

  @Column({ type: 'text', nullable: true })
  result?: string;

  @Column('varchar', { nullable: true })
  progress?: number;

  @Column({ type: 'text', nullable: true })
  error?: string;

  @Column({ type: 'datetime', nullable: true })
  startedAt?: Date;

  @Column({ type: 'datetime', nullable: true })
  completedAt?: Date;

  @Column('varchar', { nullable: true })
  durationMs?: number;

  @Column('varchar', { nullable: true })
  pid?: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
