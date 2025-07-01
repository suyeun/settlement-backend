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
exports.Settlement = void 0;
const typeorm_1 = require("typeorm");
let Settlement = class Settlement {
};
exports.Settlement = Settlement;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Settlement.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'settlement_month', type: 'varchar', length: 7, comment: '정산 월 (YYYY-MM)', nullable: true }),
    __metadata("design:type", String)
], Settlement.prototype, "settlementMonth", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'company_count', type: 'int', comment: '업체수', nullable: true }),
    __metadata("design:type", Number)
], Settlement.prototype, "companyCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'employee_count', type: 'int', comment: '인원수', nullable: true }),
    __metadata("design:type", Number)
], Settlement.prototype, "employeeCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'billing_amount', type: 'decimal', precision: 15, scale: 2, comment: '청구금액', nullable: true }),
    __metadata("design:type", Number)
], Settlement.prototype, "billingAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'commission', type: 'decimal', precision: 15, scale: 2, comment: '수수료', nullable: true }),
    __metadata("design:type", Number)
], Settlement.prototype, "commission", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'deposit_date', type: 'date', nullable: true, comment: '입금일자', default: null }),
    __metadata("design:type", Date)
], Settlement.prototype, "depositDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'settlement_commission', type: 'decimal', precision: 15, scale: 2, comment: '정산 수수료', nullable: true }),
    __metadata("design:type", Number)
], Settlement.prototype, "settlementCommission", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'note', type: 'text', nullable: true, comment: '비고', default: null }),
    __metadata("design:type", String)
], Settlement.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'amount', type: 'decimal', precision: 15, scale: 2, comment: '금액', nullable: true }),
    __metadata("design:type", Number)
], Settlement.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'settlement_date', type: 'date', nullable: true, comment: '정산일자', default: null }),
    __metadata("design:type", Date)
], Settlement.prototype, "settlementDate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', default: null }),
    __metadata("design:type", Date)
], Settlement.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', default: null }),
    __metadata("design:type", Date)
], Settlement.prototype, "updatedAt", void 0);
exports.Settlement = Settlement = __decorate([
    (0, typeorm_1.Entity)('settlements')
], Settlement);
//# sourceMappingURL=settlement.entity.js.map