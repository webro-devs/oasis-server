import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TourRoute } from './tur-route.entity';
import { TourRouteController } from './tur-route.controller';
import { TourRouteService } from './tur-route.service';

@Module({
  imports: [TypeOrmModule.forFeature([TourRoute])],
  controllers: [TourRouteController],
  providers: [TourRouteService],
  exports: [TourRouteService],
})
export class TourRouteModule {}
