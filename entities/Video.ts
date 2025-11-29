import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { BaseEntity } from "./BaseEntity";

export type VideoStatus = "draft" | "processing" | "ready" | "published";

@Entity("videos")
export class Video extends BaseEntity {
  @PrimaryColumn("varchar")
  _id!: string;

  @Column("varchar")
  subject!: string;

  @Column("varchar", { nullable: true })
  description?: string;

  @Column("integer", { default: 120 })
  length!: number;

  @Column("varchar", { default: "draft" })
  status!: VideoStatus;

  @Column("varchar", { nullable: true })
  youtubeId?: string;

  @Column("varchar", { nullable: true })
  generatedVideoUrl?: string;

  @Column("varchar", { nullable: true })
  generatedVideoPublicUrl?: string;

  @Column("varchar", { nullable: true })
  generatedVideoFileId?: string;

  @Column("varchar", { nullable: true })
  generatedVideoFilePath?: string;

  @Column({ type: "datetime", nullable: true })
  videoGeneratedAt?: Date;

  @Column("integer", { nullable: true })
  videoRenderTimeMs?: number;

  @Column("varchar", { nullable: true })
  previewVideoUrl?: string;

  @Column("varchar", { nullable: true })
  youtubeTitle?: string;

  @Column("varchar", { nullable: true })
  youtubeDescription?: string;

  @Column("varchar", { nullable: true })
  thumbnailUrl?: string;

  @Column("varchar", { nullable: true })
  thumbnailFileId?: string;

  @Column("varchar", { nullable: true })
  originalThumbnailUrl?: string;

  @Column("varchar", { nullable: true })
  originalThumbnailFileId?: string;

  @Column({ type: "text", nullable: true })
  thumbnailDesign?: string;

  @Column({ type: "text", nullable: true })
  thumbnailVariations?: string;

  @Column({ type: "text", nullable: true })
  tags?: string;

  @Column("varchar", { nullable: true })
  categoryId?: string;

  @Column("varchar", { default: "unlisted" })
  privacyStatus!: "public" | "unlisted" | "private";

  @Column("integer", { default: 0 })
  madeForKids!: boolean;

  @Column("varchar", { nullable: true })
  profileId?: string;

  @Column("varchar", { nullable: true })
  channelId?: string;

  @Column("varchar", { nullable: true })
  introPrompt?: string;

  @Column("varchar", { nullable: true })
  advertisingPrompt?: string;

  @Column("varchar", { default: "standard" })
  videoStyle!: "minimal-talking" | "standard" | "heavy-narration";

  // Video structure controls (nullable = use profile defaults)
  @Column("integer", { nullable: true })
  enableIntro?: boolean;

  @Column("integer", { nullable: true })
  enableOutro?: boolean;

  @Column("integer", { nullable: true })
  enableCTA?: boolean;

  @Column("integer", { nullable: true })
  chapterCount?: number; // null = auto, 1+ = specific count

  @Column("integer", { nullable: true })
  introDurationSeconds?: number;

  @Column("integer", { nullable: true })
  outroDurationSeconds?: number;

  @Column("integer", { nullable: true })
  ctaDurationSeconds?: number;

  @Column("varchar", { nullable: true })
  desiredResolution?: string; // Desired output resolution (preview, low, medium, high, 2k, 4k, etc.)

  @Column({ type: "text", nullable: true })
  timeline?: string;

  @Column("varchar")
  userId!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
