import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryColumn('varchar')
  _id!: string;

  @Column('varchar', { unique: true })
  email!: string;

  @Column('varchar')
  password!: string;

  @Column('varchar', { nullable: true })
  firstName?: string;

  @Column('varchar', { nullable: true })
  lastName?: string;

  @Column('varchar', { nullable: true })
  avatarUrl?: string;

  @Column('varchar', { default: 'user' })
  role!: 'admin' | 'user';

  @Column('varchar', { default: true })
  isActive!: boolean;

  @Column('varchar', { nullable: true })
  defaultProfileId?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
