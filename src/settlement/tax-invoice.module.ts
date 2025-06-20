import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaxInvoice } from './entities/tax_invoice.entity';
import { TaxInvoiceService } from './tax-invoice.service';
import { TaxInvoiceController } from './tax-invoice.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TaxInvoice])],
  controllers: [TaxInvoiceController],
  providers: [TaxInvoiceService],
  exports: [TaxInvoiceService],
})
export class TaxInvoiceModule {} 