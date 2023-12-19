import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Event } from './event.entity';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { EventContentModule } from '../event-content/event-content.module';

@Module({
  imports: [TypeOrmModule.forFeature([Event]),EventContentModule],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {}
