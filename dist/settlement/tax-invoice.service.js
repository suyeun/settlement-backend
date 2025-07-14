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
exports.TaxInvoiceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tax_invoice_entity_1 = require("./entities/tax_invoice.entity");
let TaxInvoiceService = class TaxInvoiceService {
    constructor(taxInvoiceRepository) {
        this.taxInvoiceRepository = taxInvoiceRepository;
    }
    async create(createTaxInvoiceDto) {
        const entity = this.taxInvoiceRepository.create(createTaxInvoiceDto);
        return this.taxInvoiceRepository.save(entity);
    }
    async findAll(query) {
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;
        const [data, total] = await this.taxInvoiceRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order: { id: 'DESC' },
        });
        return { data, total, page, limit };
    }
    async findOne(id) {
        return this.taxInvoiceRepository.findOneBy({ id });
    }
    async update(id, updateTaxInvoiceDto) {
        await this.taxInvoiceRepository.update(id, updateTaxInvoiceDto);
        return this.findOne(id);
    }
    async remove(id) {
        await this.taxInvoiceRepository.delete(id);
    }
};
exports.TaxInvoiceService = TaxInvoiceService;
exports.TaxInvoiceService = TaxInvoiceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tax_invoice_entity_1.TaxInvoice)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TaxInvoiceService);
//# sourceMappingURL=tax-invoice.service.js.map