import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recruitment } from './entities/recruitment.entity';
import { CreateRecruitmentDto } from './dto/create-recruitment.dto';
import { UpdateRecruitmentDto } from './dto/update-recruitment.dto';
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
      .orderBy('recruitment.settlementMonth', 'DESC')
      .addOrderBy('recruitment.createdAt', 'DESC')
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

  async update(id: number, updateRecruitmentDto: UpdateRecruitmentDto): Promise<Recruitment> {
    const recruitment = await this.findOne(id);
    if (!recruitment) {
      throw new Error('해당 ID의 데이터를 찾을 수 없습니다.');
    }

    const updatedData: any = { ...updateRecruitmentDto };
    
    if (updateRecruitmentDto.depositDate) {
      updatedData.depositDate = new Date(updateRecruitmentDto.depositDate);
    }
    if (updateRecruitmentDto.settlementDate) {
      updatedData.settlementDate = new Date(updateRecruitmentDto.settlementDate);
    }

    await this.recruitmentRepository.update(id, updatedData);
    return this.findOne(id);
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
        settlementDate: dto.settlementDate ? new Date(dto.settlementDate) : null,
        type,
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

  async getCompanies(type?: string): Promise<string[]> {
    console.log('getCompanies 호출됨 - type:', type); // 디버깅용
    
    const queryBuilder = this.recruitmentRepository.createQueryBuilder('recruitment');
    
    if (type) {
      queryBuilder.andWhere('recruitment.type = :type', { type });
      console.log('type 조건 추가됨:', type); // 디버깅용
    }
    
    queryBuilder
      .select('DISTINCT recruitment.clientName', 'clientName')
      .where('recruitment.clientName IS NOT NULL')
      .andWhere('recruitment.clientName != :empty', { empty: '' });
      
    // 실제 실행되는 SQL 쿼리 확인
    console.log('실행될 SQL:', queryBuilder.getSql());
    console.log('파라미터:', queryBuilder.getParameters());

    const result = await queryBuilder.getRawMany();
    console.log('조회 결과 개수:', result.length); // 디버깅용
    
    const companies = result.map(item => item.clientName);
    return companies;
  }

  // 임시 디버깅용 메서드 추가
  async debugTypes(): Promise<any> {
    const allData = await this.recruitmentRepository.find({
      select: ['clientName', 'type']
    });
    
    const dispatch = allData.filter(item => item.type === 'dispatch');
    const recruitment = allData.filter(item => item.type === 'recruitment');
    
    console.log('전체 데이터 개수:', allData.length);
    console.log('dispatch 개수:', dispatch.length);
    console.log('recruitment 개수:', recruitment.length);
    console.log('dispatch 업체들:', [...new Set(dispatch.map(d => d.clientName))]);
    console.log('recruitment 업체들:', [...new Set(recruitment.map(r => r.clientName))]);
    
    return {
      total: allData.length,
      dispatch: dispatch.length,
      recruitment: recruitment.length,
      dispatchCompanies: [...new Set(dispatch.map(d => d.clientName))],
      recruitmentCompanies: [...new Set(recruitment.map(r => r.clientName))]
    };
  }
} 