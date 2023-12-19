import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EventContent } from './event-content.entity';
import { EventContentService } from './event-content.service';
import { TagModule } from '../tag/tag.module';

@Module({
  imports: [TypeOrmModule.forFeature([EventContent]),TagModule],
  providers: [EventContentService],
  exports: [EventContentService],
})
export class EventContentModule {}
