import { IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSettlementDto {
  @ApiProperty({ example: '2024-03', description: '정산 월 (YYYY-MM)' })
  @IsString()
  settlementMonth: string;

  @ApiProperty({ example: 2, description: '업체수' })
  @IsNumber()
  companyCount: number;

  @ApiProperty({ example: 3, description: '인원수' })
  @IsNumber()
  employeeCount: number;

  @ApiProperty({ example: 7899500, description: '청구금액' })
  @IsNumber()
  billingAmount: number;

  @ApiProperty({ example: 492560, description: '수수료' })
  @IsNumber()
  commission: number;

  @ApiProperty({ example: '2024-04-10', description: '입금일자', required: false })
  @IsOptional()
  @IsDateString()
  depositDate?: string;

  @ApiProperty({ example: 123140, description: '정산 수수료' })
  @IsNumber()
  settlementCommission: number;

  @ApiProperty({ example: '정산일자', description: '비고', required: false })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty({ example: 123140, description: '금액' })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: '2024-02-29', description: '정산일자', required: false })
  @IsOptional()
  @IsDateString()
  settlementDate?: string;
} 