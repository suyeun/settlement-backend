import { IsString, IsInt, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreateTaxInvoiceDto {
  @IsString()
  settlementMonth: string;

  @IsInt()
  companyCount: number;

  @IsInt()
  employeeCount: number;

  @IsNumber()
  billingAmount: number;

  @IsNumber()
  commission: number;

  @IsOptional()
  @IsDateString()
  depositDate?: string;

  @IsNumber()
  settlementCommission: number;

  @IsOptional()
  @IsDateString()
  settlementDate?: string;

  @IsOptional()
  @IsString()
  note?: string;
} 