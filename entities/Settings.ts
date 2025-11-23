import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity('settings')
export class Settings extends BaseEntity {
  @PrimaryColumn('varchar')
  _id!: string;

  @Column('varchar')
  userId!: string;

  @Column('varchar', { nullable: true })
  theme?: string;

  @Column('varchar', { default: true })
  notifications!: boolean;

  @Column('varchar', { default: true })
  emailNotifications!: boolean;

  @Column('varchar', { default: 'en' })
  language!: string;

  @Column('varchar', { default: 'UTC' })
  timezone!: string;

  @Column({ type: 'text', nullable: true })
  preferences?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
