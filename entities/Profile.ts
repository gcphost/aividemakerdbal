import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity('profiles')
export class Profile extends BaseEntity {
  @PrimaryColumn('varchar')
  _id!: string;

  @Column('varchar')
  userId!: string;

  @Column('varchar')
  name!: string;

  @Column('varchar', { nullable: true })
  description?: string;

  @Column('varchar', { nullable: true })
  narratorPromptTemplate?: string;

  @Column('varchar', { nullable: true })
  introScriptTemplate?: string;

  @Column('varchar', { nullable: true })
  outroScriptTemplate?: string;

  @Column('varchar', { nullable: true })
  imageStylePrompt?: string;

  @Column('varchar', { nullable: true })
  imageDescriptionPrompt?: string;

  @Column('varchar', { nullable: true })
  soundGenerationPrompt?: string;

  @Column('varchar', { nullable: true })
  musicGenerationPrompt?: string;

  @Column('varchar', { nullable: true })
  chapterGenerationPrompt?: string;

  @Column('varchar', { nullable: true })
  advertisingScriptPrompt?: string;

  @Column('integer', { nullable: false, default: 1 })
  enableMidstoryCTA!: boolean;

  @Column('varchar', { nullable: true })
  chapterTransitionPrompt?: string;

  @Column('varchar', { nullable: true })
  antiAiPrompt?: string;

  @Column('varchar', { nullable: true, default: 'openai' })
  imageProvider?: string;

  @Column('varchar', { nullable: true, default: 'openai' })
  ttsProvider?: string;

  @Column('integer', { nullable: false, default: 0 })
  ttsUseEmotionalTags!: boolean;

  @Column({ type: 'text', nullable: true })
  ttsSettings?: string;

  @Column('varchar', { nullable: true })
  ttsVoice?: string;

  @Column('varchar', { nullable: true })
  ttsModel?: string;

  @Column('varchar', { nullable: true })
  ttsVoiceInstructions?: string;

  @Column('varchar', { nullable: true })
  ttsElevenLabsVoiceId?: string;

  @Column('int', { nullable: true, default: 30 })
  ttsChunkDurationSeconds?: number;

  @Column('varchar', { nullable: true })
  thumbnailImageProvider?: string;

  @Column({ type: 'text', nullable: true })
  imageSettings?: string;

  @Column('float', { nullable: true, default: 2.5 })
  imagesPerMinute?: number;

  @Column('int', { nullable: true, default: 10 })
  maxImagesPerChapter?: number;

  @Column('float', { nullable: true, default: 5 })
  kenBurnsZoomDuration?: number;

  @Column('float', { nullable: true, default: 0 })
  chapterDelaySeconds?: number;

  @Column('float', { nullable: true, default: 2.0 })
  chapterGapDurationSeconds?: number;

  @Column('float', { nullable: true, default: 1.0 })
  chunkDelaySeconds?: number;

  @Column('integer', { nullable: true })
  autoGenerateSounds?: boolean;

  @Column('integer', { nullable: true })
  autoGenerateMusic?: boolean;

  @Column('varchar', { nullable: true, default: 'elevenlabs' })
  musicProvider?: string;

  @Column('varchar', { nullable: true, default: 'elevenlabs' })
  soundEffectProvider?: string;

  @Column('varchar', { nullable: true, default: 'openai' })
  embeddingsProvider?: string;

  @Column('varchar', { nullable: true, default: 'text-embedding-3-small' })
  embeddingsModel?: string;

  @Column('varchar', { nullable: true, default: 'openai' })
  scriptProvider?: string;

  @Column({ type: 'text', nullable: true })
  scriptSettings?: string;

  @Column('integer', { nullable: true })
  disableImageGeneration?: boolean;

  @Column('float', { nullable: true, default: 120 })
  channelIntroDurationSeconds?: number;

  @Column('float', { nullable: true, default: 120 })
  channelOutroDurationSeconds?: number;

  @Column('float', { nullable: true, default: 165 })
  wordsPerMinute?: number;

  @Column('varchar', { nullable: false, default: 'google-veo' })
  videoProvider!: string;

  @Column({ type: 'text', nullable: true })
  videoSettings?: string;

  @Column({ type: 'text', nullable: true })
  openaiSettings?: string;

  @Column('varchar', { nullable: false, default: 'standard' })
  videoStyle!: "minimal-talking" | "standard" | "heavy-narration";

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
