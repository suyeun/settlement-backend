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
exports.CreateSettlementDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateSettlementDto {
}
exports.CreateSettlementDto = CreateSettlementDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-03', description: '정산 월 (YYYY-MM)' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSettlementDto.prototype, "settlementMonth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2, description: '업체수' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSettlementDto.prototype, "companyCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3, description: '인원수' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSettlementDto.prototype, "employeeCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 7899500, description: '청구금액' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSettlementDto.prototype, "billingAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 492560, description: '수수료' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSettlementDto.prototype, "commission", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-04-10', description: '입금일자', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateSettlementDto.prototype, "depositDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 123140, description: '정산 수수료' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSettlementDto.prototype, "settlementCommission", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '정산일자', description: '비고', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSettlementDto.prototype, "note", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 123140, description: '금액' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSettlementDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-02-29', description: '정산일자', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateSettlementDto.prototype, "settlementDate", void 0);
//# sourceMappingURL=create-settlement.dto.js.map