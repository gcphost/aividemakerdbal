import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity('chapters')
export class Chapter extends BaseEntity {
  @PrimaryColumn('varchar')
  _id!: string;

  @Column('varchar')
  videoId!: string;

  @Column('varchar')
  chapterNumber!: number;

  @Column('varchar', { nullable: true })
  title?: string;

  @Column('varchar', { nullable: true })
  description?: string;

  @Column({ type: 'text', nullable: true })
  narrationScript?: string;

  @Column('varchar', { nullable: true })
  startTime?: number;

  @Column('varchar', { nullable: true })
  endTime?: number;

  @Column('varchar', { nullable: true })
  audioUrl?: string;

  @Column('varchar', { nullable: true })
  audioFileId?: string;

  @Column('varchar', { nullable: true })
  audioDuration?: number;

  @Column({ type: 'datetime', nullable: true })
  audioGeneratedAt?: Date;

  @Column('varchar', { nullable: true })
  audioGenerationTimeMs?: number;

  @Column('varchar', { nullable: true })
  generatedAudioUrl?: string;

  @Column({ type: 'text', nullable: true })
  generatedAudioChunks?: string; // JSON array of URLs

  @Column('varchar', { nullable: true })
  generatedAudioFileId?: string;

  @Column({ type: 'text', nullable: true })
  generatedAudioChunkFileIds?: string; // JSON array of file IDs

  @Column('varchar', { nullable: true })
  generatedVideoUrl?: string;

  @Column('varchar', { nullable: true })
  generatedVideoFileId?: string;

  @Column('varchar', { nullable: true })
  targetDuration?: number;

  @Column('varchar', { nullable: true })
  actualAudioDuration?: number;

  @Column('varchar', { nullable: true })
  audioSampleRate?: number;

  @Column({ type: 'text', nullable: true })
  wordTimestamps?: string; // JSON array

  @Column('varchar', { nullable: true })
  approved?: boolean;

  @Column('varchar', { nullable: true })
  imagesDisabled?: boolean;

  @Column({ type: 'text', nullable: true })
  audioChunkStatus?: string; // JSON object tracking chunk generation status

  @Column({ type: 'text', nullable: true })
  visualCues?: string; // JSON array

  @Column({ type: 'text', nullable: true })
  soundCues?: string; // JSON array

  @Column({ type: 'text', nullable: true })
  timeline?: string; // JSON object

  @Column('varchar', { nullable: true })
  imagePrompt?: string;

  @Column('varchar', { nullable: true })
  imageUrl?: string;

  @Column('varchar', { nullable: true })
  imageFileId?: string;

  @Column({ type: 'datetime', nullable: true })
  imageGeneratedAt?: Date;

  @Column('varchar', { nullable: true })
  imageGenerationTimeMs?: number;

  @Column('varchar', { default: 'draft' })
  status!: "draft" | "processing" | "ready";

  @Column('varchar')
  userId!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
