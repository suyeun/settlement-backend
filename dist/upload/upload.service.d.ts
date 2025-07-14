export declare class UploadService {
    constructor();
    uploadCsv(buffer: Buffer): Promise<{
        message: string;
        count: number;
    }>;
}
