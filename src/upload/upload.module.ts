import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { SettlementModule } from '../settlement/settlement.module';

@Module({
  imports: [SettlementModule],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {} 