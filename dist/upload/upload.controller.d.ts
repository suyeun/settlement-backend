import { UploadService } from './upload.service';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    uploadCsv(file: Express.Multer.File): Promise<{
        message: string;
        count: number;
    }>;
}
