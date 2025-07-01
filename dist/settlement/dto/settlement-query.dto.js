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
exports.SettlementQueryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class SettlementQueryDto {
    constructor() {
        this.page = 1;
        this.limit = 10;
    }
}
exports.SettlementQueryDto = SettlementQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, description: '페이지 번호(기본값 1)' }),
    __metadata("design:type", Number)
], SettlementQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 10, description: '페이지당 개수(기본값 10)' }),
    __metadata("design:type", Number)
], SettlementQueryDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2024-03', description: '검색어(정산 월, 비고 등)' }),
    __metadata("design:type", String)
], SettlementQueryDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2024-01-01', description: '시작일', required: false }),
    __metadata("design:type", String)
], SettlementQueryDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2024-12-31', description: '종료일', required: false }),
    __metadata("design:type", String)
], SettlementQueryDto.prototype, "endDate", void 0);
//# sourceMappingURL=settlement-query.dto.js.map