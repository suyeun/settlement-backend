import { Controller, Get, Post, Body, Param, Delete, Query, UseGuards, Inject } from '@nestjs/common';
import { SettlementService } from './settlement.service';
import { CreateSettlementDto } from './dto/create-settlement.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SettlementQueryDto } from './dto/settlement-query.dto';
import { ApiOperation, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RecruitmentService } from '../recruitment/recruitment.service';

@Controller('settlements')
export class SettlementController {
  constructor(
    private readonly settlementService: SettlementService,
    private readonly recruitmentService: RecruitmentService,
  ) {}

  @Post()
  create(@Body() createSettlementDto: CreateSettlementDto) {
    return this.settlementService.create(createSettlementDto);
  }

  @Get()
  @ApiOperation({ summary: '정산내역 목록 조회' })
  @ApiOkResponse({
    description: '정산내역 목록 응답',
    schema: {
      example: {
        data: [
          {
            id: 1,
            settlementMonth: '2024-03',
            companyCount: 2,
            employeeCount: 3,
            billingAmount: 7899500,
            commission: 492560,
            depositDate: '2024-04-10',
            settlementCommission: 123140,
            note: '정산일자',
            amount: 123140,
            settlementDate: '2024-02-29',
            createdAt: '2024-04-11T12:34:56.000Z',
            updatedAt: '2024-04-11T12:34:56.000Z'
          }
        ],
        total: 1,
        page: 1,
        limit: 10
      }
    }
  })
  findAll(@Query() query: any) {
    const { page = 1, limit = 10, search, startDate, endDate, company } = query;
    return this.settlementService.findAll(
      Number(page),
      Number(limit),
      search,
      startDate,
      endDate,
      company,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.settlementService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.settlementService.remove(+id);
  }

  @Get('/dashboard/summary')
  async getDashboardSummary() {
    // 정산내역
    const settlements = await this.settlementService.findAll(1, 1000);
    // 파견
    const dispatch = await this.recruitmentService.findAll(1, 1000, 'dispatch');
    // 채용대행
    const recruitment = await this.recruitmentService.findAll(1, 1000, 'recruitment');
    // 월별 집계
    const monthMap = new Map();
    settlements.data.forEach((item: any) => {
      const m = item.settlementMonth;
      if (!monthMap.has(m)) monthMap.set(m, { month: m, companyCount: 0, dispatchCount: 0, recruitCount: 0, revenue: 0, commission: 0 });
      const row = monthMap.get(m);
      row.companyCount += Number(item.companyCount || 0);
      row.revenue += Number(item.billingAmount || 0);
      row.commission += Number(item.settlementCommission || 0);
    });
    dispatch.data.forEach((item: any) => {
      const m = item.settlementMonth;
      if (!monthMap.has(m)) monthMap.set(m, { month: m, companyCount: 0, dispatchCount: 0, recruitCount: 0, revenue: 0, commission: 0 });
      const row = monthMap.get(m);
      row.dispatchCount += Number(item.employeeCount || 0);
      row.commission += Number(item.settlementCommission || 0);
    });
    recruitment.data.forEach((item: any) => {
      const m = item.settlementMonth;
      if (!monthMap.has(m)) monthMap.set(m, { month: m, companyCount: 0, dispatchCount: 0, recruitCount: 0, revenue: 0, commission: 0 });
      const row = monthMap.get(m);
      row.recruitCount += Number(item.employeeCount || 0);
      row.commission += Number(item.settlementCommission || 0);
    });
    // 월 정렬
    const monthRows = Array.from(monthMap.values()).sort((a, b) => a.month.localeCompare(b.month));
    return { data: monthRows };
  }
} 