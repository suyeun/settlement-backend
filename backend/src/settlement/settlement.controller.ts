import { Controller, Get, Post, Body, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { SettlementService } from './settlement.service';
import { CreateSettlementDto } from './dto/create-settlement.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SettlementQueryDto } from './dto/settlement-query.dto';
import { ApiOperation, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@Controller('settlements')
@UseGuards(JwtAuthGuard)
export class SettlementController {
  constructor(private readonly settlementService: SettlementService) {}

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
  findAll(@Query() query: SettlementQueryDto) {
    const { page = 1, limit = 10, search, startDate, endDate } = query;
    return this.settlementService.findAll(
      Number(page),
      Number(limit),
      search,
      startDate,
      endDate,
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
} 