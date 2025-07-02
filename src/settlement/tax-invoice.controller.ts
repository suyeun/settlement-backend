import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile, Req } from '@nestjs/common';
import { TaxInvoiceService } from './tax-invoice.service';
import { CreateTaxInvoiceDto } from './dto/create-tax-invoice.dto';
import { UpdateTaxInvoiceDto } from './dto/update-tax-invoice.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as csvParser from 'csv-parser';
import { Readable } from 'stream';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

@Controller('tax-invoices')
export class TaxInvoiceController {
  constructor(private readonly taxInvoiceService: TaxInvoiceService) {}

  @Post()
  create(@Body() createTaxInvoiceDto: CreateTaxInvoiceDto) {
    return this.taxInvoiceService.create(createTaxInvoiceDto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.taxInvoiceService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taxInvoiceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaxInvoiceDto: UpdateTaxInvoiceDto) {
    return this.taxInvoiceService.update(+id, updateTaxInvoiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taxInvoiceService.remove(+id);
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
    const results: CreateTaxInvoiceDto[] = [];
    return new Promise((resolve, reject) => {
      const stream = Readable.from(file.buffer.toString());
      stream
        .pipe(csvParser())
        .on('data', (data) => {
          const invoice: CreateTaxInvoiceDto = {
            settlementMonth: data['정산 월'] || data['settlement_month'],
            companyCount: parseInt(data['업체수'] || data['company_count']) || 0,
            employeeCount: parseInt(data['인원수'] || data['employee_count']) || 0,
            billingAmount: parseFloat(data['청구금액'] || data['billing_amount']) || 0,
            commission: parseFloat(data['수수료'] || data['commission']) || 0,
            depositDate: data['입금일자'] || data['deposit_date'] || null,
            settlementCommission: parseFloat(data['정산 수수료'] || data['settlement_commission']) || 0,
            settlementDate: data['정산일자'] || data['settlement_date'] || null,
            note: data['비고'] || data['note'] || '',
          };
          results.push(invoice);
        })
        .on('end', async () => {
          try {
            const saved = await Promise.all(results.map(dto => this.taxInvoiceService.create(dto)));
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

  @Post('upload-image')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: (req, file, cb) => {
        const { year, month } = req.body;
        const dir = path.join(__dirname, '../../../uploads/tax-invoice', `${year}-${month}`);
        console.log('이미지 저장 경로:', dir);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
      },
      filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const basename = path.basename(file.originalname, ext);
        cb(null, `${uuidv4()}${ext}`);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (file.mimetype.match(/image\/(jpeg|png|jpg)/)) {
        cb(null, true);
      } else {
        cb(new Error('이미지 파일(jpg, jpeg, png)만 업로드 가능합니다.'), false);
      }
    },
  }))
  async uploadImage(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    if (!file) {
      throw new Error('이미지 파일을 선택해주세요.');
    }
    const { year, month, id } = body;
    const imagePath = `/uploads/tax-invoice/${year}-${month}/${file.filename}`;
    if (id) {
      // 기존 이미지 삭제 및 DB 업데이트
      const old = await this.taxInvoiceService.findOne(Number(id));
      if (old && old.imagePath) {
        const oldPath = path.join(__dirname, '../../..', old.imagePath);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      await this.taxInvoiceService.update(Number(id), { imagePath });
      return { message: '이미지 교체 성공', id, imagePath };
    } else {
      // 신규 업로드
      const dto: any = {
        settlementMonth: `${year}-${month}`,
        imagePath,
        companyCount: 0,
        employeeCount: 0,
        billingAmount: 0,
        commission: 0,
        depositDate: null,
        settlementCommission: 0,
        settlementDate: null,
        note: '',
      };
      const saved = await this.taxInvoiceService.create(dto);
      return { message: '이미지 업로드 성공', data: saved };
    }
  }
} 