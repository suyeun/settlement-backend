import { ApiPropertyOptional } from '@nestjs/swagger';

export class RecruitmentQueryDto {
  @ApiPropertyOptional({ example: 1, description: '페이지 번호(기본값 1)' })
  page?: number = 1;

  @ApiPropertyOptional({ example: 10, description: '페이지당 개수(기본값 10)' })
  limit?: number = 10;

  @ApiPropertyOptional({ example: 'ABC기업', description: '검색어(거래처명, 정산 월 등)' })
  search?: string;

  @ApiPropertyOptional({ example: 'dispatch', description: '구분(파견: dispatch, 채용대행: recruitment)' })
  type?: string;
} 