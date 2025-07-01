import { Repository } from 'typeorm';
import { TaxInvoice } from './entities/tax_invoice.entity';
import { CreateTaxInvoiceDto } from './dto/create-tax-invoice.dto';
import { UpdateTaxInvoiceDto } from './dto/update-tax-invoice.dto';
export declare class TaxInvoiceService {
    private readonly taxInvoiceRepository;
    constructor(taxInvoiceRepository: Repository<TaxInvoice>);
    create(createTaxInvoiceDto: CreateTaxInvoiceDto): Promise<TaxInvoice>;
    findAll(query: any): Promise<{
        data: TaxInvoice[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: number): Promise<TaxInvoice>;
    update(id: number, updateTaxInvoiceDto: UpdateTaxInvoiceDto): Promise<TaxInvoice>;
    remove(id: number): Promise<void>;
}
