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
      taxInvoiceDate: createRecruitmentDto.taxInvoiceDate ? new Date(createRecruitmentDto.taxInvoiceDate) : null,
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

  async createBulk(recruitments: CreateRecruitmentDto[]): Promise<Recruitment[]> {
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
} 