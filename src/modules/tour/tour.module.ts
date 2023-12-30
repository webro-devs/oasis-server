import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Tour } from './tour.entity';
import { TourService } from './tour.service';
import { TourController } from './tour.controller';
import { TourContentModule } from '../tour-content/tour-content.module';
import { TagModule } from '../tag/tag.module';
import { TourPriceModule } from '../tour-price/tour-price.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tour]),TourContentModule,TagModule,TourPriceModule],
  controllers: [TourController],
  providers: [TourService],
  exports: [TourService],
})
export class TourModule {}
