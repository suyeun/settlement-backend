import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { RecruitmentModule } from './recruitment/recruitment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'settlement_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // 개발환경에서만 사용
    }),
    AuthModule,
    UploadModule,
    RecruitmentModule,
  ],
})
export class AppModule {} 