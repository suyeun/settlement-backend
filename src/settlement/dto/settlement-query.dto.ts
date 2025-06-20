import { ApiPropertyOptional } from '@nestjs/swagger';

export class SettlementQueryDto {
  @ApiPropertyOptional({ example: 1, description: '페이지 번호(기본값 1)' })
  page?: number = 1;

  @ApiPropertyOptional({ example: 10, description: '페이지당 개수(기본값 10)' })
  limit?: number = 10;

  @ApiPropertyOptional({ example: '2024-03', description: '검색어(정산 월, 비고 등)' })
  search?: string;

  @ApiPropertyOptional({ example: '2024-01-01', description: '시작일', required: false })
  startDate?: string;

  @ApiPropertyOptional({ example: '2024-12-31', description: '종료일', required: false })
  endDate?: string;
} 