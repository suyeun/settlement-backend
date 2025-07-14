import { Repository } from 'typeorm';
import { Recruitment } from './entities/recruitment.entity';
import { CreateRecruitmentDto } from './dto/create-recruitment.dto';
import { UpdateRecruitmentDto } from './dto/update-recruitment.dto';
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
    update(id: number, updateRecruitmentDto: UpdateRecruitmentDto): Promise<Recruitment>;
    remove(id: number): Promise<void>;
    createBulk(recruitments: CreateRecruitmentDto[], type: string): Promise<Recruitment[]>;
    updateImagePath(id: number, imagePath: string): Promise<void>;
    deleteImage(id: number): Promise<void>;
}
