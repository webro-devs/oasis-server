import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Tour } from './tour.entity';
import { TourService } from './tour.service';
import { TourController } from './tour.controller';
import { TourContentModule } from '../tour-content/tour-content.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tour]),TourContentModule],
  controllers: [TourController],
  providers: [TourService],
  exports: [TourService],
})
export class TourModule {}
