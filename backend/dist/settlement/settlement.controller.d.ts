import { SettlementService } from './settlement.service';
import { CreateSettlementDto } from './dto/create-settlement.dto';
export declare class SettlementController {
    private readonly settlementService;
    constructor(settlementService: SettlementService);
    create(createSettlementDto: CreateSettlementDto): Promise<import("./entities/settlement.entity").Settlement>;
    findAll(page?: string, limit?: string, search?: string, startDate?: string, endDate?: string): Promise<{
        data: import("./entities/settlement.entity").Settlement[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<import("./entities/settlement.entity").Settlement>;
    remove(id: string): Promise<void>;
}
