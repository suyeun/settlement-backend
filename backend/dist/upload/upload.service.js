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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const settlement_service_1 = require("../settlement/settlement.service");
const csvParser = require("csv-parser");
const stream_1 = require("stream");
let UploadService = class UploadService {
    constructor(settlementService) {
        this.settlementService = settlementService;
    }
    async uploadCsv(buffer) {
        const results = [];
        return new Promise((resolve, reject) => {
            const stream = stream_1.Readable.from(buffer.toString());
            stream
                .pipe(csvParser())
                .on('data', (data) => {
                const settlement = {
                    settlementMonth: data['정산 월'] || data['settlement_month'],
                    companyCount: parseInt(data['업체수'] || data['company_count']) || 0,
                    employeeCount: parseInt(data['인원수'] || data['employee_count']) || 0,
                    billingAmount: parseFloat(data['청구금액'] || data['billing_amount']) || 0,
                    commission: parseFloat(data['수수료'] || data['commission']) || 0,
                    depositDate: data['입금일자'] || data['deposit_date'] || null,
                    settlementCommission: parseFloat(data['정산 수수료'] || data['settlement_commission']) || 0,
                    note: data['비고'] || data['note'] || null,
                    amount: parseFloat(data['금액'] || data['amount']) || 0,
                    settlementDate: data['정산일자'] || data['settlement_date'] || null,
                };
                results.push(settlement);
            })
                .on('end', async () => {
                try {
                    const savedSettlements = await this.settlementService.createBulk(results);
                    resolve({
                        message: 'CSV 파일이 성공적으로 업로드되었습니다.',
                        count: savedSettlements.length,
                    });
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
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [settlement_service_1.SettlementService])
], UploadService);
//# sourceMappingURL=upload.service.js.map