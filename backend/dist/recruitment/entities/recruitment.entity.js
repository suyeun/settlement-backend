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
exports.Recruitment = void 0;
const typeorm_1 = require("typeorm");
let Recruitment = class Recruitment {
};
exports.Recruitment = Recruitment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Recruitment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'settlement_month', type: 'varchar', length: 7, comment: '정산 월 (YYYY-MM)' }),
    __metadata("design:type", String)
], Recruitment.prototype, "settlementMonth", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'client_name', type: 'varchar', length: 100, comment: '거래처명' }),
    __metadata("design:type", String)
], Recruitment.prototype, "clientName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'employee_count', type: 'int', comment: '인원수' }),
    __metadata("design:type", Number)
], Recruitment.prototype, "employeeCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'billing_amount', type: 'decimal', precision: 15, scale: 2, comment: '청구금액' }),
    __metadata("design:type", Number)
], Recruitment.prototype, "billingAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'commission', type: 'decimal', precision: 15, scale: 2, comment: '수수료' }),
    __metadata("design:type", Number)
], Recruitment.prototype, "commission", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'commission_standard', type: 'varchar', length: 50, nullable: true, comment: '수수료 지급기준' }),
    __metadata("design:type", String)
], Recruitment.prototype, "commissionStandard", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'billing_period', type: 'varchar', length: 50, nullable: true, comment: '청구기간' }),
    __metadata("design:type", String)
], Recruitment.prototype, "billingPeriod", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'deposit_date', type: 'date', nullable: true, comment: '입금일자' }),
    __metadata("design:type", Date)
], Recruitment.prototype, "depositDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tax_invoice_date', type: 'date', nullable: true, comment: '세금계산서 발행일' }),
    __metadata("design:type", Date)
], Recruitment.prototype, "taxInvoiceDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'settlement_commission', type: 'decimal', precision: 15, scale: 2, comment: '정산 수수료' }),
    __metadata("design:type", Number)
], Recruitment.prototype, "settlementCommission", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'settlement_date', type: 'date', nullable: true, comment: '정산일자' }),
    __metadata("design:type", Date)
], Recruitment.prototype, "settlementDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'note', type: 'text', nullable: true, comment: '비고' }),
    __metadata("design:type", String)
], Recruitment.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Recruitment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Recruitment.prototype, "updatedAt", void 0);
exports.Recruitment = Recruitment = __decorate([
    (0, typeorm_1.Entity)('recruitments')
], Recruitment);
//# sourceMappingURL=recruitment.entity.js.map