"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecruitmentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const recruitment_entity_1 = require("./entities/recruitment.entity");
let RecruitmentService = class RecruitmentService {
    constructor(recruitmentRepository) {
        this.recruitmentRepository = recruitmentRepository;
    }
    async create(createRecruitmentDto) {
        const recruitment = this.recruitmentRepository.create({
            ...createRecruitmentDto,
            depositDate: createRecruitmentDto.depositDate ? new Date(createRecruitmentDto.depositDate) : null,
            settlementDate: createRecruitmentDto.settlementDate ? new Date(createRecruitmentDto.settlementDate) : null,
        });
        return this.recruitmentRepository.save(recruitment);
    }
    async findAll(page = 1, limit = 10, search, dateRange, company, type) {
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
            queryBuilder.andWhere('(recruitment.settlementMonth ILIKE :search OR recruitment.clientName ILIKE :search OR recruitment.note ILIKE :search)', { search: `%${search}%` });
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
    async findOne(id) {
        return this.recruitmentRepository.findOne({ where: { id } });
    }
    async update(id, updateRecruitmentDto) {
        const recruitment = await this.findOne(id);
        if (!recruitment) {
            throw new Error('해당 ID의 데이터를 찾을 수 없습니다.');
        }
        const updatedData = { ...updateRecruitmentDto };
        if (updateRecruitmentDto.depositDate) {
            updatedData.depositDate = new Date(updateRecruitmentDto.depositDate);
        }
        if (updateRecruitmentDto.settlementDate) {
            updatedData.settlementDate = new Date(updateRecruitmentDto.settlementDate);
        }
        await this.recruitmentRepository.update(id, updatedData);
        return this.findOne(id);
    }
    async remove(id) {
        await this.recruitmentRepository.delete(id);
    }
    async createBulk(recruitments, type) {
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
        const entities = recruitments.map(dto => this.recruitmentRepository.create({
            ...dto,
            depositDate: dto.depositDate ? new Date(dto.depositDate) : null,
            settlementDate: dto.settlementDate ? new Date(dto.settlementDate) : null,
            type,
        }));
        return this.recruitmentRepository.save(entities);
    }
    async updateImagePath(id, imagePath) {
        await this.recruitmentRepository.update(id, { imagePath });
    }
    async deleteImage(id) {
        const recruitment = await this.recruitmentRepository.findOne({ where: { id } });
        if (recruitment?.imagePath) {
            const fs = require('fs');
            const path = require('path');
            const filePath = path.join(process.cwd(), recruitment.imagePath);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
            await this.recruitmentRepository.update(id, { imagePath: null });
        }
    }
};
exports.RecruitmentService = RecruitmentService;
exports.RecruitmentService = RecruitmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(recruitment_entity_1.Recruitment)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RecruitmentService);
//# sourceMappingURL=recruitment.service.js.map