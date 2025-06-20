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
exports.SettlementService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const settlement_entity_1 = require("./entities/settlement.entity");
let SettlementService = class SettlementService {
    constructor(settlementRepository) {
        this.settlementRepository = settlementRepository;
    }
    async create(createSettlementDto) {
        const settlement = this.settlementRepository.create({
            ...createSettlementDto,
            depositDate: createSettlementDto.depositDate ? new Date(createSettlementDto.depositDate) : null,
            settlementDate: createSettlementDto.settlementDate ? new Date(createSettlementDto.settlementDate) : null,
        });
        return this.settlementRepository.save(settlement);
    }
    async findAll(page = 1, limit = 10, search, startDate, endDate) {
        const skip = (page - 1) * limit;
        const queryBuilder = this.settlementRepository.createQueryBuilder('settlement');
        if (search) {
            queryBuilder.andWhere('(settlement.settlementMonth ILIKE :search OR settlement.note ILIKE :search)', { search: `%${search}%` });
        }
        if (startDate && endDate) {
            queryBuilder.andWhere('settlement.settlementDate BETWEEN :startDate AND :endDate', { startDate, endDate });
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
    async findOne(id) {
        return this.settlementRepository.findOne({ where: { id } });
    }
    async remove(id) {
        await this.settlementRepository.delete(id);
    }
    async createBulk(settlements) {
        const entities = settlements.map(dto => this.settlementRepository.create({
            ...dto,
            depositDate: dto.depositDate ? new Date(dto.depositDate) : null,
            settlementDate: dto.settlementDate ? new Date(dto.settlementDate) : null,
        }));
        return this.settlementRepository.save(entities);
    }
};
exports.SettlementService = SettlementService;
exports.SettlementService = SettlementService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(settlement_entity_1.Settlement)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SettlementService);
//# sourceMappingURL=settlement.service.js.map