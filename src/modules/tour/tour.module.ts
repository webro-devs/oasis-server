import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Tour } from './tour.entity';
import { TourService } from './tour.service';
import { TourController } from './tour.controller';
import { TourContentModule } from '../tour-content/tour-content.module';
import { TourPriceModule } from '../tour-price/tour-price.module';
import { TourItineraryModule } from '../tour-itinerary/tour-itinerary.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tour]),TourContentModule,TourPriceModule,TourItineraryModule],
  controllers: [TourController],
  providers: [TourService],
  exports: [TourService],
})
export class TourModule {}
