import { SettlementService } from '../settlement/settlement.service';
export declare class UploadService {
    private readonly settlementService;
    constructor(settlementService: SettlementService);
    uploadCsv(buffer: Buffer): Promise<{
        message: string;
        count: number;
    }>;
}
