import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DestinationType } from './destination-type.entity';
import { DestinationTypeService } from './destination-type.service';
import { DestinationTypeController } from './destination-type.controller';
import { PageModule } from '../page/page.module';

@Module({
  imports: [TypeOrmModule.forFeature([DestinationType]),PageModule],
  controllers: [DestinationTypeController],
  providers: [DestinationTypeService],
  exports: [DestinationTypeService],
})
export class DestinationTypeModule {}
