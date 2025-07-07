import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('recruitments')
export class Recruitment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'settlement_month', type: 'varchar', length: 7, comment: '정산 월 (YYYY-MM)' })
  settlementMonth: string;

  @Column({ name: 'client_name', type: 'varchar', length: 100, comment: '거래처명' })
  clientName: string;

  @Column({ name: 'employee_count', type: 'int', comment: '인원수' })
  employeeCount: number;

  @Column({ name: 'billing_amount', type: 'decimal', precision: 15, scale: 2, comment: '청구금액' })
  billingAmount: number;

  @Column({ name: 'commission', type: 'decimal', precision: 15, scale: 2, comment: '수수료' })
  commission: number;

  @Column({ name: 'commission_standard', type: 'varchar', length: 50, nullable: true, comment: '수수료 지급기준' })
  commissionStandard: string;

  @Column({ name: 'billing_period', type: 'varchar', length: 50, nullable: true, comment: '청구기간' })
  billingPeriod: string;

  @Column({ name: 'deposit_date', type: 'date', nullable: true, comment: '입금일자' })
  depositDate: Date;

  @Column({ name: 'settlement_commission', type: 'decimal', precision: 15, scale: 2, comment: '정산 수수료' })
  settlementCommission: number;

  @Column({ name: 'settlement_date', type: 'date', nullable: true, comment: '정산일자' })
  settlementDate: Date;

  @Column({ name: 'note', type: 'text', nullable: true, comment: '비고' })
  note: string;

  @Column({ name: 'type', type: 'varchar', length: 20, comment: '구분(파견/채용대행)' })
  type: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
} 