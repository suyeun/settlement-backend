import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecruitmentService } from './recruitment.service';
import { RecruitmentController } from './recruitment.controller';
import { Recruitment } from './entities/recruitment.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Recruitment])],
  controllers: [RecruitmentController],
  providers: [RecruitmentService],
  exports: [RecruitmentService, TypeOrmModule],
})
export class RecruitmentModule {} 