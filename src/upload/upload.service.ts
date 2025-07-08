import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  constructor() {}

  async uploadCsv(buffer: Buffer): Promise<{ message: string; count: number }> {
    // 이 서비스는 더 이상 사용되지 않습니다.
    throw new Error('Settlement 업로드 기능이 제거되었습니다.');
  }
} 