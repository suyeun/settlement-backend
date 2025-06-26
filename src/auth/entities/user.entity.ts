import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, comment: '사용자 아이디' })
  username: string;

  @Column({ comment: '비밀번호 (해시)' })
  password: string;

  @Column({ nullable: true, comment: '사용자 이름' })
  name: string;

  @Column({ default: true, comment: '활성화 여부' })
  isActive: boolean;

  @Column({ name: 'role', type: 'varchar', length: 20, default: 'user', comment: '사용자 권한(admin, user)' })
  role: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
} 