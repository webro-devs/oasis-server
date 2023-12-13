import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DestinationContent } from './destination-content.entity';
import { DestinationContentService } from './destination-content.service';
import { TagModule } from '../tag/tag.module';

@Module({
  imports: [TypeOrmModule.forFeature([DestinationContent]),TagModule],
  providers: [DestinationContentService],
  exports: [DestinationContentService],
})
export class DestinationContentModule {}
