import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettlementService } from './settlement.service';
import { SettlementController } from './settlement.controller';
import { Settlement } from './entities/settlement.entity';
import { TaxInvoiceModule } from './tax-invoice.module';

@Module({
  imports: [TypeOrmModule.forFeature([Settlement]), TaxInvoiceModule],
  controllers: [SettlementController],
  providers: [SettlementService],
  exports: [SettlementService],
})
export class SettlementModule {} 