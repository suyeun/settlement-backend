import { SettlementService } from './settlement.service';
import { CreateSettlementDto } from './dto/create-settlement.dto';
import { RecruitmentService } from '../recruitment/recruitment.service';
export declare class SettlementController {
    private readonly settlementService;
    private readonly recruitmentService;
    constructor(settlementService: SettlementService, recruitmentService: RecruitmentService);
    create(createSettlementDto: CreateSettlementDto): Promise<import("./entities/settlement.entity").Settlement>;
    findAll(query: any): Promise<{
        data: import("./entities/settlement.entity").Settlement[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<import("./entities/settlement.entity").Settlement>;
    remove(id: string): Promise<void>;
    getDashboardSummary(): Promise<{
        data: any[];
    }>;
}
