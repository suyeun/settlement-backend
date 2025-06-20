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
            taxInvoiceDate: createRecruitmentDto.taxInvoiceDate ? new Date(createRecruitmentDto.taxInvoiceDate) : null,
            settlementDate: createRecruitmentDto.settlementDate ? new Date(createRecruitmentDto.settlementDate) : null,
        });
        return this.recruitmentRepository.save(recruitment);
    }
    async findAll(page = 1, limit = 10, search) {
        const skip = (page - 1) * limit;
        const queryBuilder = this.recruitmentRepository.createQueryBuilder('recruitment');
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
    async remove(id) {
        await this.recruitmentRepository.delete(id);
    }
    async createBulk(recruitments) {
        const entities = recruitments.map(dto => this.recruitmentRepository.create({
            ...dto,
            depositDate: dto.depositDate ? new Date(dto.depositDate) : null,
            taxInvoiceDate: dto.taxInvoiceDate ? new Date(dto.taxInvoiceDate) : null,
            settlementDate: dto.settlementDate ? new Date(dto.settlementDate) : null,
        }));
        return this.recruitmentRepository.save(entities);
    }
};
exports.RecruitmentService = RecruitmentService;
exports.RecruitmentService = RecruitmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(recruitment_entity_1.Recruitment)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RecruitmentService);
//# sourceMappingURL=recruitment.service.js.map