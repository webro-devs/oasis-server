import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoadTransport } from './road-transport.entity';
import { RoadTransportService } from './road-transport.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoadTransport])],
  providers: [RoadTransportService],
  exports: [RoadTransportService],
})
export class RoadTransportModule {}
