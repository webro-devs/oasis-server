import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Tour } from './tour.entity';
import { TourService } from './tour.service';
import { TourController } from './tour.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tour])],
  controllers: [TourController],
  providers: [TourService],
  exports: [TourService],
})
export class TourModule {}
