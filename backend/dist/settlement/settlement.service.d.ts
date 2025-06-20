import { Repository } from 'typeorm';
import { Settlement } from './entities/settlement.entity';
import { CreateSettlementDto } from './dto/create-settlement.dto';
export declare class SettlementService {
    private settlementRepository;
    constructor(settlementRepository: Repository<Settlement>);
    create(createSettlementDto: CreateSettlementDto): Promise<Settlement>;
    findAll(page?: number, limit?: number, search?: string, startDate?: string, endDate?: string): Promise<{
        data: Settlement[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: number): Promise<Settlement>;
    remove(id: number): Promise<void>;
    createBulk(settlements: CreateSettlementDto[]): Promise<Settlement[]>;
}
