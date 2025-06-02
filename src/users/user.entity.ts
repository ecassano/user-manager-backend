import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: UserRole.USER })
  role: UserRole;

  @Column()
  password: string;

  @Column({ default: UserStatus.ACTIVE })
  status: UserStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;
}
