import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity('background_audio')
export class BackgroundAudio extends BaseEntity {
  @PrimaryColumn('varchar')
  _id!: string;

  @Column('varchar')
  userId!: string;

  @Column('varchar')
  name!: string;

  @Column('varchar', { nullable: true })
  title?: string;

  @Column('varchar', { nullable: true })
  description?: string;

  @Column('varchar', { nullable: true })
  genre?: string;

  @Column('varchar', { nullable: true })
  mood?: string;

  @Column('varchar', { nullable: true })
  tempo?: string;

  @Column('varchar', { default: false })
  instrumental!: boolean;

  @Column('varchar', { nullable: true })
  audioUrl?: string;

  @Column('varchar', { nullable: true })
  audioFileId?: string;

  @Column('varchar', { nullable: true })
  duration?: number;

  @Column('varchar', { default: 70 })
  volume!: number;

  @Column('varchar', { default: false })
  loop!: boolean;

  @Column('varchar', { nullable: true })
  searchTerm?: string;

  @Column('varchar', { nullable: true })
  prompt?: string;

  @Column('varchar', { default: 'draft' })
  status!: "draft" | "processing" | "ready";

  @Column({ type: 'datetime', nullable: true })
  audioGeneratedAt?: Date;

  @Column('varchar', { nullable: true })
  audioGenerationTimeMs?: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
