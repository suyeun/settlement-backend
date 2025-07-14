import { TaxInvoiceService } from './tax-invoice.service';
import { CreateTaxInvoiceDto } from './dto/create-tax-invoice.dto';
import { UpdateTaxInvoiceDto } from './dto/update-tax-invoice.dto';
export declare class TaxInvoiceController {
    private readonly taxInvoiceService;
    constructor(taxInvoiceService: TaxInvoiceService);
    create(createTaxInvoiceDto: CreateTaxInvoiceDto): Promise<import("./entities/tax_invoice.entity").TaxInvoice>;
    findAll(query: any): Promise<{
        data: import("./entities/tax_invoice.entity").TaxInvoice[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<import("./entities/tax_invoice.entity").TaxInvoice>;
    update(id: string, updateTaxInvoiceDto: UpdateTaxInvoiceDto): Promise<import("./entities/tax_invoice.entity").TaxInvoice>;
    remove(id: string): Promise<void>;
    uploadCsv(file: Express.Multer.File): Promise<unknown>;
    uploadImage(file: Express.Multer.File, body: any): Promise<{
        message: string;
        id: any;
        imagePath: string;
        data?: undefined;
    } | {
        message: string;
        data: import("./entities/tax_invoice.entity").TaxInvoice;
        id?: undefined;
        imagePath?: undefined;
    }>;
}
