import { RecruitmentService } from './recruitment.service';
import { CreateRecruitmentDto } from './dto/create-recruitment.dto';
import { UpdateRecruitmentDto } from './dto/update-recruitment.dto';
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
    update(id: string, updateRecruitmentDto: UpdateRecruitmentDto): Promise<import("./entities/recruitment.entity").Recruitment>;
    remove(id: string): Promise<void>;
    uploadDispatchCsv(file: Express.Multer.File): Promise<unknown>;
    uploadRecruitmentCsv(file: Express.Multer.File): Promise<unknown>;
    uploadImage(id: string, file: Express.Multer.File): Promise<{
        message: string;
        imagePath: string;
    }>;
    deleteImage(id: string): Promise<{
        message: string;
    }>;
}
