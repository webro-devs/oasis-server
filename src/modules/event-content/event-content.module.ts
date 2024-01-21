import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EventContent } from './event-content.entity';
import { EventContentService } from './event-content.service';

@Module({
  imports: [TypeOrmModule.forFeature([EventContent])],
  providers: [EventContentService],
  exports: [EventContentService],
})
export class EventContentModule {}
