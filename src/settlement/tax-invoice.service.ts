import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaxInvoice } from './entities/tax_invoice.entity';
import { CreateTaxInvoiceDto } from './dto/create-tax-invoice.dto';
import { UpdateTaxInvoiceDto } from './dto/update-tax-invoice.dto';

@Injectable()
export class TaxInvoiceService {
  constructor(
    @InjectRepository(TaxInvoice)
    private readonly taxInvoiceRepository: Repository<TaxInvoice>,
  ) {}

  async create(createTaxInvoiceDto: CreateTaxInvoiceDto): Promise<TaxInvoice> {
    const entity = this.taxInvoiceRepository.create(createTaxInvoiceDto);
    return this.taxInvoiceRepository.save(entity);
  }

  async findAll(query: any): Promise<{ data: TaxInvoice[]; total: number; page: number; limit: number }> {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const [data, total] = await this.taxInvoiceRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'DESC' },
    });
    return { data, total, page, limit };
  }

  async findOne(id: number): Promise<TaxInvoice> {
    return this.taxInvoiceRepository.findOneBy({ id });
  }

  async update(id: number, updateTaxInvoiceDto: UpdateTaxInvoiceDto): Promise<TaxInvoice> {
    await this.taxInvoiceRepository.update(id, updateTaxInvoiceDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.taxInvoiceRepository.delete(id);
  }
} 