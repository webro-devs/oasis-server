import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TourPrice } from './tour-price.entity';
import { TourPriceService } from './tour-price.service';

@Module({
  imports: [TypeOrmModule.forFeature([TourPrice])],
  providers: [TourPriceService],
  exports: [TourPriceService],
})
export class TourPriceModule {}
