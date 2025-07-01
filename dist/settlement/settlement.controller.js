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
exports.SettlementController = void 0;
const common_1 = require("@nestjs/common");
const settlement_service_1 = require("./settlement.service");
const create_settlement_dto_1 = require("./dto/create-settlement.dto");
const swagger_1 = require("@nestjs/swagger");
const recruitment_service_1 = require("../recruitment/recruitment.service");
let SettlementController = class SettlementController {
    constructor(settlementService, recruitmentService) {
        this.settlementService = settlementService;
        this.recruitmentService = recruitmentService;
    }
    create(createSettlementDto) {
        return this.settlementService.create(createSettlementDto);
    }
    findAll(query) {
        const { page = 1, limit = 10, search, startDate, endDate, company } = query;
        return this.settlementService.findAll(Number(page), Number(limit), search, startDate, endDate, company);
    }
    findOne(id) {
        return this.settlementService.findOne(+id);
    }
    remove(id) {
        return this.settlementService.remove(+id);
    }
    async getDashboardSummary() {
        const settlements = await this.settlementService.findAll(1, 1000);
        const dispatch = await this.recruitmentService.findAll(1, 1000, 'dispatch');
        const recruitment = await this.recruitmentService.findAll(1, 1000, 'recruitment');
        const monthMap = new Map();
        settlements.data.forEach((item) => {
            const m = item.settlementMonth;
            if (!monthMap.has(m))
                monthMap.set(m, { month: m, companyCount: 0, dispatchCount: 0, recruitCount: 0, revenue: 0, commission: 0 });
            const row = monthMap.get(m);
            row.companyCount += Number(item.companyCount || 0);
            row.revenue += Number(item.billingAmount || 0);
            row.commission += Number(item.settlementCommission || 0);
        });
        dispatch.data.forEach((item) => {
            const m = item.settlementMonth;
            if (!monthMap.has(m))
                monthMap.set(m, { month: m, companyCount: 0, dispatchCount: 0, recruitCount: 0, revenue: 0, commission: 0 });
            const row = monthMap.get(m);
            row.dispatchCount += Number(item.employeeCount || 0);
            row.commission += Number(item.settlementCommission || 0);
        });
        recruitment.data.forEach((item) => {
            const m = item.settlementMonth;
            if (!monthMap.has(m))
                monthMap.set(m, { month: m, companyCount: 0, dispatchCount: 0, recruitCount: 0, revenue: 0, commission: 0 });
            const row = monthMap.get(m);
            row.recruitCount += Number(item.employeeCount || 0);
            row.commission += Number(item.settlementCommission || 0);
        });
        const monthRows = Array.from(monthMap.values()).sort((a, b) => a.month.localeCompare(b.month));
        return { data: monthRows };
    }
};
exports.SettlementController = SettlementController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_settlement_dto_1.CreateSettlementDto]),
    __metadata("design:returntype", void 0)
], SettlementController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '정산내역 목록 조회' }),
    (0, swagger_1.ApiOkResponse)({
        description: '정산내역 목록 응답',
        schema: {
            example: {
                data: [
                    {
                        id: 1,
                        settlementMonth: '2024-03',
                        companyCount: 2,
                        employeeCount: 3,
                        billingAmount: 7899500,
                        commission: 492560,
                        depositDate: '2024-04-10',
                        settlementCommission: 123140,
                        note: '정산일자',
                        amount: 123140,
                        settlementDate: '2024-02-29',
                        createdAt: '2024-04-11T12:34:56.000Z',
                        updatedAt: '2024-04-11T12:34:56.000Z'
                    }
                ],
                total: 1,
                page: 1,
                limit: 10
            }
        }
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SettlementController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SettlementController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SettlementController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('/dashboard/summary'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SettlementController.prototype, "getDashboardSummary", null);
exports.SettlementController = SettlementController = __decorate([
    (0, common_1.Controller)('settlements'),
    __metadata("design:paramtypes", [settlement_service_1.SettlementService,
        recruitment_service_1.RecruitmentService])
], SettlementController);
//# sourceMappingURL=settlement.controller.js.map