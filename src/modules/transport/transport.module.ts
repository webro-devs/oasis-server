import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Transport } from './transport.entity';
import { TransportService } from './transport.service';
import { TransportController } from './transport.controller';
import { PageModule } from '../page/page.module';
import { RoadTransportModule } from '../road-transport/road-transport.module';

@Module({
  imports: [TypeOrmModule.forFeature([Transport]),PageModule,RoadTransportModule],
  controllers: [TransportController],
  providers: [TransportService],
  exports: [TransportService],
})
export class TransportModule {}
