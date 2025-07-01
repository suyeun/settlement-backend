import { RecruitmentService } from './recruitment.service';
import { CreateRecruitmentDto } from './dto/create-recruitment.dto';
export declare class RecruitmentController {
    private readonly recruitmentService;
    constructor(recruitmentService: RecruitmentService);
    create(createRecruitmentDto: CreateRecruitmentDto): Promise<import("./entities/recruitment.entity").Recruitment>;
    findAll(query: any): Promise<{
        data: import("./entities/recruitment.entity").Recruitment[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<import("./entities/recruitment.entity").Recruitment>;
    remove(id: string): Promise<void>;
    uploadDispatchCsv(file: Express.Multer.File): Promise<unknown>;
    uploadRecruitmentCsv(file: Express.Multer.File): Promise<unknown>;
}
