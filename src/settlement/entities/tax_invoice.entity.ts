import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('tax_invoices')
export class TaxInvoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'settlement_month', type: 'varchar', length: 7, comment: '정산 월 (YYYY-MM)' , nullable: true })
  settlementMonth?: string;

  @Column({ name: 'company_count', type: 'int', comment: '업체수' , nullable: true })
  companyCount?: number;

  @Column({ name: 'employee_count', type: 'int', comment: '인원수' , nullable: true })
  employeeCount?: number;

  @Column({ name: 'billing_amount', type: 'decimal', precision: 15, scale: 2, comment: '청구금액' , nullable: true })
  billingAmount?: number;

  @Column({ name: 'commission', type: 'decimal', precision: 15, scale: 2, comment: '수수료' , nullable: true })
  commission?: number;

  @Column({ name: 'deposit_date', type: 'date', nullable: true, comment: '입금일자' , default: null })
  depositDate?: Date;

  @Column({ name: 'settlement_commission', type: 'decimal', precision: 15, scale: 2, comment: '정산 수수료' , nullable: true })
  settlementCommission?: number;

  @Column({ name: 'settlement_date', type: 'date', nullable: true, comment: '정산일자' , default: null })
  settlementDate?: Date;

  @Column({ name: 'note', type: 'text', nullable: true, comment: '비고' , default: null })
  note?: string;

  @Column({ name: 'image_path', type: 'varchar', length: 255, nullable: true, comment: '이미지 파일 경로' , default: null })
  imagePath?: string;

  @CreateDateColumn({ name: 'created_at' , default: null })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' , default: null })
  updatedAt?: Date;
} 