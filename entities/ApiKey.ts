import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity('api_keys')
@Index(['userId', 'service'], { unique: true })
export class ApiKey extends BaseEntity {
  @PrimaryColumn('varchar')
  _id!: string;

  @Column('varchar')
  userId!: string;

  @Column('varchar')
  service!: string;

  @Column('varchar', { nullable: true })
  apiKey?: string;

  @Column('varchar', { nullable: true })
  apiSecret?: string;

  @Column('varchar', { nullable: true })
  apiUrl?: string;

  @Column('varchar', { nullable: true })
  model?: string;

  @Column('varchar', { default: true })
  isActive!: boolean;

  @Column({ type: 'text', nullable: true })
  config?: string;

  @Column({ type: 'datetime', nullable: true })
  lastUsedAt?: Date;

  @Column('varchar', { nullable: true })
  usageCount?: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
