import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DestinationContent } from './destination-content.entity';
import { DestinationContentService } from './destination-content.service';

@Module({
  imports: [TypeOrmModule.forFeature([DestinationContent])],
  providers: [DestinationContentService],
  exports: [DestinationContentService],
})
export class DestinationContentModule {}
