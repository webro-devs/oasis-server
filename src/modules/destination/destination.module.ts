import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Destination } from './destination.entity';
import { DestinationService } from './destination.service';
import { DestinationController } from './destination.controller';
import { DestinationContentModule } from '../destination-content/destination-content.module';

@Module({
  imports: [TypeOrmModule.forFeature([Destination]),DestinationContentModule],
  controllers: [DestinationController],
  providers: [DestinationService],
  exports: [DestinationService],
})
export class DestinationModule {}
