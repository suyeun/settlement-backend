import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Between } from 'typeorm';
import { Settlement } from './entities/settlement.entity';
import { CreateSettlementDto } from './dto/create-settlement.dto';

@Injectable()
export class SettlementService {
  constructor(
    @InjectRepository(Settlement)
    private settlementRepository: Repository<Settlement>,
  ) {}

  async create(createSettlementDto: CreateSettlementDto): Promise<Settlement> {
    const settlement = this.settlementRepository.create({
      ...createSettlementDto,
      depositDate: createSettlementDto.depositDate ? new Date(createSettlementDto.depositDate) : null,
      settlementDate: createSettlementDto.settlementDate ? new Date(createSettlementDto.settlementDate) : null,
    });
    return this.settlementRepository.save(settlement);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    search?: string,
    startDate?: string,
    endDate?: string,
    company?: string,
  ): Promise<{ data: Settlement[]; total: number; page: number; limit: number }> {
    const skip = (page - 1) * limit;
    const queryBuilder = this.settlementRepository.createQueryBuilder('settlement');

    if (search) {
      queryBuilder.andWhere(
        '(settlement.settlementMonth ILIKE :search OR settlement.note ILIKE :search)',
        { search: `%${search}%` }
      );
    }

    if (startDate && endDate) {
      queryBuilder.andWhere(
        'settlement.settlementDate BETWEEN :startDate AND :endDate',
        { startDate, endDate }
      );
    }

    if (company && company !== '전체업체') {
      queryBuilder.andWhere('settlement.companyName = :company', { company });
    }

    queryBuilder
      .orderBy('settlement.createdAt', 'DESC')
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

  async findOne(id: number): Promise<Settlement> {
    return this.settlementRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.settlementRepository.delete(id);
  }

  async createBulk(settlements: CreateSettlementDto[]): Promise<Settlement[]> {
    const entities = settlements.map(dto => 
      this.settlementRepository.create({
        ...dto,
        depositDate: dto.depositDate ? new Date(dto.depositDate) : null,
        settlementDate: dto.settlementDate ? new Date(dto.settlementDate) : null,
      })
    );
    return this.settlementRepository.save(entities);
  }
} 