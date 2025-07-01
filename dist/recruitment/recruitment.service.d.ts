import { Repository } from 'typeorm';
import { Recruitment } from './entities/recruitment.entity';
import { CreateRecruitmentDto } from './dto/create-recruitment.dto';
export declare class RecruitmentService {
    private recruitmentRepository;
    constructor(recruitmentRepository: Repository<Recruitment>);
    create(createRecruitmentDto: CreateRecruitmentDto): Promise<Recruitment>;
    findAll(page?: number, limit?: number, search?: string, dateRange?: [string, string], company?: string, type?: string): Promise<{
        data: Recruitment[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: number): Promise<Recruitment>;
    remove(id: number): Promise<void>;
    createBulk(recruitments: CreateRecruitmentDto[]): Promise<Recruitment[]>;
}
