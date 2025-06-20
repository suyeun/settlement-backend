import { Controller, Get, Post, Body, Param, Delete, Query, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common';
import { RecruitmentService } from './recruitment.service';
import { CreateRecruitmentDto } from './dto/create-recruitment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import * as csvParser from 'csv-parser';
import { Readable } from 'stream';
import { RecruitmentQueryDto } from './dto/recruitment-query.dto';
import { ApiOperation, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@Controller('recruitments')
@UseGuards(JwtAuthGuard)
export class RecruitmentController {
  constructor(private readonly recruitmentService: RecruitmentService) {}

  @Post()
  create(@Body() createRecruitmentDto: CreateRecruitmentDto) {
    return this.recruitmentService.create(createRecruitmentDto);
  }

  @Get()
  @ApiOperation({ summary: '채용대행 목록 조회' })
  @ApiOkResponse({
    description: '채용대행 목록 응답',
    schema: {
      example: {
        data: [
          {
            id: 1,
            settlementMonth: '2024-03',
            clientName: 'ABC기업',
            employeeCount: 3,
            billingAmount: 7899500,
            commission: 492560,
            commissionStandard: '기본',
            billingPeriod: '2024-03-01~2024-03-31',
            depositDate: '2024-04-10',
            taxInvoiceDate: '2024-04-15',
            settlementCommission: 123140,
            settlementDate: '2024-02-29',
            note: '비고 예시',
            createdAt: '2024-04-11T12:34:56.000Z',
            updatedAt: '2024-04-11T12:34:56.000Z'
          }
        ],
        total: 1,
        page: 1,
        limit: 10
      }
    }
  })
  findAll(@Query() query: RecruitmentQueryDto) {
    const { page = 1, limit = 10, search } = query;
    return this.recruitmentService.findAll(
      Number(page),
      Number(limit),
      search,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recruitmentService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recruitmentService.remove(+id);
  }

  @Post('upload-csv')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCsv(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('파일을 선택해주세요.');
    }
    if (file.mimetype !== 'text/csv' && !file.originalname.endsWith('.csv')) {
      throw new Error('CSV 파일만 업로드 가능합니다.');
    }
    const results: CreateRecruitmentDto[] = [];
    return new Promise(async (resolve, reject) => {
      const stream = Readable.from(file.buffer.toString());
      stream
        .pipe(csvParser())
        .on('data', (data) => {
          const recruitment: CreateRecruitmentDto = {
            settlementMonth: data['정산 월'] || data['settlement_month'],
            clientName: data['거래처명'] || data['client_name'],
            employeeCount: parseInt(data['인원수'] || data['employee_count']) || 0,
            billingAmount: parseFloat(data['청구금액'] || data['billing_amount']) || 0,
            commission: parseFloat(data['수수료'] || data['commission']) || 0,
            commissionStandard: data['수수료 지급기준'] || data['commission_standard'] || '',
            billingPeriod: data['청구기간'] || data['billing_period'] || '',
            depositDate: data['입금일자'] || data['deposit_date'] || null,
            taxInvoiceDate: data['세금계산서 발행일'] || data['tax_invoice_date'] || null,
            settlementCommission: parseFloat(data['정산 수수료'] || data['settlement_commission']) || 0,
            settlementDate: data['정산일자'] || data['settlement_date'] || null,
            note: data['비고'] || data['note'] || '',
          };
          results.push(recruitment);
        })
        .on('end', async () => {
          try {
            const saved = await this.recruitmentService.createBulk(results);
            resolve({ message: 'CSV 업로드 성공', count: saved.length });
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