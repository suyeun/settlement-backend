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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaxInvoiceController = void 0;
const common_1 = require("@nestjs/common");
const tax_invoice_service_1 = require("./tax-invoice.service");
const create_tax_invoice_dto_1 = require("./dto/create-tax-invoice.dto");
const update_tax_invoice_dto_1 = require("./dto/update-tax-invoice.dto");
const platform_express_1 = require("@nestjs/platform-express");
const csvParser = require("csv-parser");
const stream_1 = require("stream");
const multer_1 = require("multer");
const path = require("path");
const fs = require("fs");
let TaxInvoiceController = class TaxInvoiceController {
    constructor(taxInvoiceService) {
        this.taxInvoiceService = taxInvoiceService;
    }
    create(createTaxInvoiceDto) {
        return this.taxInvoiceService.create(createTaxInvoiceDto);
    }
    findAll(query) {
        return this.taxInvoiceService.findAll(query);
    }
    findOne(id) {
        return this.taxInvoiceService.findOne(+id);
    }
    update(id, updateTaxInvoiceDto) {
        return this.taxInvoiceService.update(+id, updateTaxInvoiceDto);
    }
    remove(id) {
        return this.taxInvoiceService.remove(+id);
    }
    async uploadCsv(file) {
        if (!file) {
            throw new Error('파일을 선택해주세요.');
        }
        if (file.mimetype !== 'text/csv' && !file.originalname.endsWith('.csv')) {
            throw new Error('CSV 파일만 업로드 가능합니다.');
        }
        const results = [];
        return new Promise((resolve, reject) => {
            const stream = stream_1.Readable.from(file.buffer.toString());
            stream
                .pipe(csvParser())
                .on('data', (data) => {
                const invoice = {
                    settlementMonth: data['정산 월'] || data['settlement_month'],
                    companyCount: parseInt(data['업체수'] || data['company_count']) || 0,
                    employeeCount: parseInt(data['인원수'] || data['employee_count']) || 0,
                    billingAmount: parseFloat(data['청구금액'] || data['billing_amount']) || 0,
                    commission: parseFloat(data['수수료'] || data['commission']) || 0,
                    depositDate: data['입금일자'] || data['deposit_date'] || null,
                    settlementCommission: parseFloat(data['정산 수수료'] || data['settlement_commission']) || 0,
                    settlementDate: data['정산일자'] || data['settlement_date'] || null,
                    note: data['비고'] || data['note'] || '',
                };
                results.push(invoice);
            })
                .on('end', async () => {
                try {
                    const saved = await Promise.all(results.map(dto => this.taxInvoiceService.create(dto)));
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
    async uploadImage(file, body) {
        if (!file) {
            throw new Error('이미지 파일을 선택해주세요.');
        }
        const { year, month, id } = body;
        const imagePath = `/uploads/tax-invoice/${year}-${month}/${file.filename}`;
        if (id) {
            const old = await this.taxInvoiceService.findOne(Number(id));
            if (old && old.imagePath) {
                const oldPath = path.join(__dirname, '../../..', old.imagePath);
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }
            await this.taxInvoiceService.update(Number(id), { imagePath });
            return { message: '이미지 교체 성공', id, imagePath };
        }
        else {
            const dto = {
                settlementMonth: `${year}-${month}`,
                imagePath,
                companyCount: 0,
                employeeCount: 0,
                billingAmount: 0,
                commission: 0,
                depositDate: null,
                settlementCommission: 0,
                settlementDate: null,
                note: '',
            };
            const saved = await this.taxInvoiceService.create(dto);
            return { message: '이미지 업로드 성공', data: saved };
        }
    }
};
exports.TaxInvoiceController = TaxInvoiceController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tax_invoice_dto_1.CreateTaxInvoiceDto]),
    __metadata("design:returntype", void 0)
], TaxInvoiceController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TaxInvoiceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TaxInvoiceController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_tax_invoice_dto_1.UpdateTaxInvoiceDto]),
    __metadata("design:returntype", void 0)
], TaxInvoiceController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TaxInvoiceController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('upload-csv'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof Express !== "undefined" && (_a = Express.Multer) !== void 0 && _a.File) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], TaxInvoiceController.prototype, "uploadCsv", null);
__decorate([
    (0, common_1.Post)('upload-image'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: (req, file, cb) => {
                const { year, month } = req.body;
                const dir = path.join(__dirname, '../../../uploads/tax-invoice', `${year}-${month}`);
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                }
                cb(null, dir);
            },
            filename: (req, file, cb) => {
                const ext = path.extname(file.originalname);
                const basename = path.basename(file.originalname, ext);
                cb(null, `${basename}-${Date.now()}${ext}`);
            },
        }),
        fileFilter: (req, file, cb) => {
            if (file.mimetype.match(/image\/(jpeg|png|jpg)/)) {
                cb(null, true);
            }
            else {
                cb(new Error('이미지 파일(jpg, jpeg, png)만 업로드 가능합니다.'), false);
            }
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof Express !== "undefined" && (_c = Express.Multer) !== void 0 && _c.File) === "function" ? _d : Object, Object]),
    __metadata("design:returntype", Promise)
], TaxInvoiceController.prototype, "uploadImage", null);
exports.TaxInvoiceController = TaxInvoiceController = __decorate([
    (0, common_1.Controller)('tax-invoices'),
    __metadata("design:paramtypes", [tax_invoice_service_1.TaxInvoiceService])
], TaxInvoiceController);
//# sourceMappingURL=tax-invoice.controller.js.map