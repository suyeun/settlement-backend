import { Injectable } from '@nestjs/common';
import { SettlementService } from '../settlement/settlement.service';
import * as csvParser from 'csv-parser';
import { Readable } from 'stream';

@Injectable()
export class UploadService {
  constructor(private readonly settlementService: SettlementService) {}

  async uploadCsv(buffer: Buffer): Promise<{ message: string; count: number }> {
    const results: any[] = [];
    
    return new Promise((resolve, reject) => {
      const stream = Readable.from(buffer.toString());
      
      stream
        .pipe(csvParser())
        .on('data', (data) => {
          // CSV 헤더를 정산내역 필드에 매핑
          const settlement = {
            settlementMonth: data['정산 월'] || data['settlement_month'],
            companyCount: parseInt(data['업체수'] || data['company_count']) || 0,
            employeeCount: parseInt(data['인원수'] || data['employee_count']) || 0,
            billingAmount: parseFloat(data['청구금액'] || data['billing_amount']) || 0,
            commission: parseFloat(data['수수료'] || data['commission']) || 0,
            depositDate: data['입금일자'] || data['deposit_date'] || null,
            settlementCommission: parseFloat(data['정산 수수료'] || data['settlement_commission']) || 0,
            note: data['비고'] || data['note'] || null,
            amount: parseFloat(data['금액'] || data['amount']) || 0,
            settlementDate: data['정산일자'] || data['settlement_date'] || null,
          };
          results.push(settlement);
        })
        .on('end', async () => {
          try {
            const savedSettlements = await this.settlementService.createBulk(results);
            resolve({
              message: 'CSV 파일이 성공적으로 업로드되었습니다.',
              count: savedSettlements.length,
            });
          } catch (error) {
            reject(error);
          }
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }
} 