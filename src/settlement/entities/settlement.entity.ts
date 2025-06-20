import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('settlements')
export class Settlement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'settlement_month', type: 'varchar', length: 7, comment: '정산 월 (YYYY-MM)' })
  settlementMonth: string;

  @Column({ name: 'company_count', type: 'int', comment: '업체수' })
  companyCount: number;

  @Column({ name: 'employee_count', type: 'int', comment: '인원수' })
  employeeCount: number;

  @Column({ name: 'billing_amount', type: 'decimal', precision: 15, scale: 2, comment: '청구금액' })
  billingAmount: number;

  @Column({ name: 'commission', type: 'decimal', precision: 15, scale: 2, comment: '수수료' })
  commission: number;

  @Column({ name: 'deposit_date', type: 'date', nullable: true, comment: '입금일자' })
  depositDate: Date;

  @Column({ name: 'settlement_commission', type: 'decimal', precision: 15, scale: 2, comment: '정산 수수료' })
  settlementCommission: number;

  @Column({ name: 'note', type: 'text', nullable: true, comment: '비고' })
  note: string;

  @Column({ name: 'amount', type: 'decimal', precision: 15, scale: 2, comment: '금액' })
  amount: number;

  @Column({ name: 'settlement_date', type: 'date', nullable: true, comment: '정산일자' })
  settlementDate: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
} 