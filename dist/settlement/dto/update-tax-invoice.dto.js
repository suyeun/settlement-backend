"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTaxInvoiceDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_tax_invoice_dto_1 = require("./create-tax-invoice.dto");
class UpdateTaxInvoiceDto extends (0, mapped_types_1.PartialType)(create_tax_invoice_dto_1.CreateTaxInvoiceDto) {
}
exports.UpdateTaxInvoiceDto = UpdateTaxInvoiceDto;
//# sourceMappingURL=update-tax-invoice.dto.js.map