import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recruitment } from './entities/recruitment.entity';
import { CreateRecruitmentDto } from './dto/create-recruitment.dto';

@Injectable()
export class RecruitmentService {
  constructor(
    @InjectRepository(Recruitment)
    private recruitmentRepository: Repository<Recruitment>,
  ) {}

  async create(createRecruitmentDto: CreateRecruitmentDto): Promise<Recruitment> {
    const recruitment = this.recruitmentRepository.create({
      ...createRecruitmentDto,
      depositDate: createRecruitmentDto.depositDate ? new Date(createRecruitmentDto.depositDate) : null,
      settlementDate: createRecruitmentDto.settlementDate ? new Date(createRecruitmentDto.settlementDate) : null,
    });
    return this.recruitmentRepository.save(recruitment);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    search?: string,
    dateRange?: [string, string],
    company?: string,
    type?: string,
  ): Promise<{ data: Recruitment[]; total: number; page: number; limit: number }> {
    const skip = (page - 1) * limit;
    const queryBuilder = this.recruitmentRepository.createQueryBuilder('recruitment');

    if (type) {
      queryBuilder.andWhere('recruitment.type = :type', { type });
    }
    if (company && company !== '전체업체') {
      queryBuilder.andWhere('recruitment.clientName = :company', { company });
    }
    if (dateRange && dateRange[0] && dateRange[1]) {
      queryBuilder.andWhere('recruitment.settlementMonth BETWEEN :start AND :end', {
        start: dateRange[0],
        end: dateRange[1],
      });
    }
    if (search) {
      queryBuilder.andWhere(
        '(recruitment.settlementMonth ILIKE :search OR recruitment.clientName ILIKE :search OR recruitment.note ILIKE :search)',
        { search: `%${search}%` }
      );
    }
    queryBuilder
      .orderBy('recruitment.createdAt', 'DESC')
      .skip(skip)
      .take(limit);

    const [data, total] = await queryBuilder.getManyAndCount();

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async findOne(id: number): Promise<Recruitment> {
    return this.recruitmentRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.recruitmentRepository.delete(id);
  }

  async createBulk(recruitments: CreateRecruitmentDto[], type: string): Promise<Recruitment[]> {
    if (type === 'dispatch') {
      const dispatch = await this.recruitmentRepository.find({ where: { type: 'dispatch' } });
      if (dispatch.length > 0) {
        await this.recruitmentRepository.delete({ type: 'dispatch' });
      }
    }

    if (type === 'recruitment') {
      const recruitment = await this.recruitmentRepository.find({ where: { type: 'recruitment' } });
      if (recruitment.length > 0) {
        await this.recruitmentRepository.delete({ type: 'recruitment' });
      }
    }
    
    const entities = recruitments.map(dto =>
      this.recruitmentRepository.create({
        ...dto,
        depositDate: dto.depositDate ? new Date(dto.depositDate) : null,
        taxInvoiceDate: dto.taxInvoiceDate ? new Date(dto.taxInvoiceDate) : null,
        settlementDate: dto.settlementDate ? new Date(dto.settlementDate) : null,
      })
    );
    return this.recruitmentRepository.save(entities);
  }

  async updateImagePath(id: number, imagePath: string): Promise<void> {
    await this.recruitmentRepository.update(id, { imagePath });
  }

  async deleteImage(id: number): Promise<void> {
    const recruitment = await this.recruitmentRepository.findOne({ where: { id } });
    if (recruitment?.imagePath) {
      // 파일 시스템에서 이미지 파일 삭제
      const fs = require('fs');
      const path = require('path');
      const filePath = path.join(process.cwd(), recruitment.imagePath);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      // DB에서 이미지 경로 제거
      await this.recruitmentRepository.update(id, { imagePath: null });
    }
  }
} 