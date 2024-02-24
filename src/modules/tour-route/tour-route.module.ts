import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TourRoute } from './tour-route.entity';
import { TourRouteController } from './tour-route.controller';
import { TourRouteService } from './tour-route.service';

@Module({
  imports: [TypeOrmModule.forFeature([TourRoute])],
  controllers: [TourRouteController],
  providers: [TourRouteService],
  exports: [TourRouteService],
})
export class TourRouteModule {}
