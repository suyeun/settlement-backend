import { Controller, Get, Post, Body, Param, Delete, Query, UseGuards, UploadedFile, UseInterceptors, Put } from '@nestjs/common';
import { RecruitmentService } from './recruitment.service';
import { CreateRecruitmentDto } from './dto/create-recruitment.dto';
import { UpdateRecruitmentDto } from './dto/update-recruitment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import * as csvParser from 'csv-parser';
import { Readable } from 'stream';
import { RecruitmentQueryDto } from './dto/recruitment-query.dto';
import { ApiOperation, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';

@UseGuards(JwtAuthGuard)
@Controller('recruitments')
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
  findAll(@Query() query: any) {
    const { page = 1, limit = 10, search, dateRange, company, type } = query;
    return this.recruitmentService.findAll(
      Number(page),
      Number(limit),
      search,
      dateRange,
      company,
      type,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recruitmentService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRecruitmentDto: UpdateRecruitmentDto) {
    return this.recruitmentService.update(+id, updateRecruitmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recruitmentService.remove(+id);
  }

  @Post('upload-csv/dispatch')
  @UseInterceptors(FileInterceptor('file'))
  async uploadDispatchCsv(@UploadedFile() file: Express.Multer.File) {
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
            settlementMonth: data['정산 월'] || data['settlement_month'] || '',
            clientName: data['거래처명'] || data['client_name'] || '',
            employeeCount: parseInt(data['인원수'] || data['employee_count']) || 0,
            billingAmount: parseFloat(data['청구금액'] || data['billing_amount']) || 0,
            commission: parseFloat(data['수수료'] || data['commission']) || 0,
            commissionStandard: data['수수료 지급기준'] || data['commission_standard'] || '',
            billingPeriod: data['청구기간'] || data['billing_period'] || '',
            depositDate: data['입금일자'] || data['deposit_date'] || null,
            settlementCommission: parseFloat(data['정산 수수료'] || data['settlement_commission']) || 0,
            settlementDate: data['정산일자'] || data['settlement_date'] || null,
            note: data['비고'] || data['note'] || '',
            type: 'dispatch',
          };
          results.push(recruitment);
        })
        .on('end', async () => {
          try {
            const saved = await this.recruitmentService.createBulk(results, 'dispatch');
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

  @Post('upload-csv/recruitment')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadRecruitmentCsv(@UploadedFile() file: Express.Multer.File) {
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
            settlementMonth: data['정산 월'] || data['settlement_month'] || '',
            clientName: data['거래처명'] || data['client_name'] || '',
            employeeCount: parseInt(data['인원수'] || data['employee_count']) || 0,
            billingAmount: parseFloat(data['청구금액'] || data['billing_amount']) || 0,
            commission: parseFloat(data['수수료'] || data['commission']) || 0,
            commissionStandard: data['수수료 지급기준'] || data['commission_standard'] || '',
            billingPeriod: data['청구기간'] || data['billing_period'] || '',
            depositDate: data['입금일자'] || data['deposit_date'] || null,
            settlementCommission: parseFloat(data['정산 수수료'] || data['settlement_commission']) || 0,
            settlementDate: data['정산일자'] || data['settlement_date'] || null,
            note: data['비고'] || data['note'] || '',
            type: 'recruitment',
          };
          results.push(recruitment);
        })
        .on('end', async () => {
          try {
            const saved = await this.recruitmentService.createBulk(results, 'recruitment');
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

  @Post('upload-image/:id')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: (req, file, callback) => {
        console.log(req, file);
        const uploadPath = path.join(process.cwd(), 'uploads');
        if (!fs.existsSync(uploadPath)) {
          fs.mkdirSync(uploadPath, { recursive: true });
        }
        callback(null, uploadPath);
      },
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        callback(null, `recruitment-${uniqueSuffix}${ext}`);
      },
    }),
  }))
  async uploadImage(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    const imagePath = `/uploads/${file.filename}`;
    await this.recruitmentService.updateImagePath(+id, imagePath);
    return { message: '이미지가 업로드되었습니다.', imagePath };
  }

  @Delete('image/:id')
  async deleteImage(@Param('id') id: string) {
    await this.recruitmentService.deleteImage(+id);
    return { message: '이미지가 삭제되었습니다.' };
  }
} 