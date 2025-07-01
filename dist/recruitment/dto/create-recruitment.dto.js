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
exports.CreateRecruitmentDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateRecruitmentDto {
}
exports.CreateRecruitmentDto = CreateRecruitmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-03', description: '정산 월 (YYYY-MM)' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRecruitmentDto.prototype, "settlementMonth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ABC기업', description: '거래처명' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRecruitmentDto.prototype, "clientName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3, description: '인원수' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateRecruitmentDto.prototype, "employeeCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 7899500, description: '청구금액' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateRecruitmentDto.prototype, "billingAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 492560, description: '수수료' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateRecruitmentDto.prototype, "commission", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '기본', description: '수수료 지급기준', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRecruitmentDto.prototype, "commissionStandard", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-03-01~2024-03-31', description: '청구기간', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRecruitmentDto.prototype, "billingPeriod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-04-10', description: '입금일자', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateRecruitmentDto.prototype, "depositDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-04-15', description: '세금계산서 발행일', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateRecruitmentDto.prototype, "taxInvoiceDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 123140, description: '정산 수수료' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateRecruitmentDto.prototype, "settlementCommission", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-02-29', description: '정산일자', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateRecruitmentDto.prototype, "settlementDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '비고 예시', description: '비고', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRecruitmentDto.prototype, "note", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'dispatch', description: '구분(파견: dispatch, 채용대행: recruitment)' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRecruitmentDto.prototype, "type", void 0);
//# sourceMappingURL=create-recruitment.dto.js.map