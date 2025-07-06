import { IsString, IsNotEmpty } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'admin', description: '권한' })
  role?: string;

  @ApiPropertyOptional({ example: '테스터', description: '이름' })
  name?: string;

  @ApiPropertyOptional({ example: 'password123', description: '비밀번호' })
  password?: string;
} 