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
exports.RecruitmentController = void 0;
const common_1 = require("@nestjs/common");
const recruitment_service_1 = require("./recruitment.service");
const create_recruitment_dto_1 = require("./dto/create-recruitment.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const platform_express_1 = require("@nestjs/platform-express");
const csvParser = require("csv-parser");
const stream_1 = require("stream");
let RecruitmentController = class RecruitmentController {
    constructor(recruitmentService) {
        this.recruitmentService = recruitmentService;
    }
    create(createRecruitmentDto) {
        return this.recruitmentService.create(createRecruitmentDto);
    }
    findAll(page = '1', limit = '10', search) {
        return this.recruitmentService.findAll(parseInt(page), parseInt(limit), search);
    }
    findOne(id) {
        return this.recruitmentService.findOne(+id);
    }
    remove(id) {
        return this.recruitmentService.remove(+id);
    }
    async uploadCsv(file) {
        if (!file) {
            throw new Error('파일을 선택해주세요.');
        }
        if (file.mimetype !== 'text/csv' && !file.originalname.endsWith('.csv')) {
            throw new Error('CSV 파일만 업로드 가능합니다.');
        }
        const results = [];
        return new Promise(async (resolve, reject) => {
            const stream = stream_1.Readable.from(file.buffer.toString());
            stream
                .pipe(csvParser())
                .on('data', (data) => {
                const recruitment = {
                    settlementMonth: data['정산 월'] || data['settlement_month'] || '',
                    clientName: data['거래처명'] || data['client_name'] || '',
                    employeeCount: parseInt(data['인원수'] || data['employee_count']) || 0,
                    billingAmount: parseFloat(data['청구금액'] || data['billing_amount']) || 0,
                    commission: parseFloat(data['수수료'] || data['commission']) || 0,
                    commissionStandard: data['수수료 지급기준'] || data['commission_standard'] || '',
                    billingPeriod: data['청구기간'] || data['billing_period'] || '',
                    depositDate: data['입금일자'] || data['deposit_date'] || null,
                    taxInvoiceDate: data['세금계산서 발행일'] || data['tax_invoice_date'] || null,
                    settlementCommission: parseFloat(data['정산 수수료'] || data['settlement_commission']) || 0,
                    settlementDate: data['정산일자'] || data['settlement_date'] || null,
                    note: data['비고'] || data['note'] || '',
                };
                results.push(recruitment);
            })
                .on('end', async () => {
                try {
                    const saved = await this.recruitmentService.createBulk(results);
                    resolve({ message: 'CSV 업로드 성공', count: saved.length });
                }
                catch (error) {
                    reject(error);
                }
            })
                .on('error', (error) => {
                reject(error);
            });
        });
    }
};
exports.RecruitmentController = RecruitmentController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_recruitment_dto_1.CreateRecruitmentDto]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('upload-csv'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "uploadCsv", null);
exports.RecruitmentController = RecruitmentController = __decorate([
    (0, common_1.Controller)('recruitments'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [recruitment_service_1.RecruitmentService])
], RecruitmentController);
//# sourceMappingURL=recruitment.controller.js.map