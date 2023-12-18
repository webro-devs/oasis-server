import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Attraction } from './attraction.entity';
import { AttractionService } from './attraction.service';
import { AttractionController } from './attraction.controller';
import { AttractionContentModule } from '../attraction-content/attraction-content.module';

@Module({
  imports: [TypeOrmModule.forFeature([Attraction]),AttractionContentModule],
  controllers: [AttractionController],
  providers: [AttractionService],
  exports: [AttractionService],
})
export class AttractionModule {}
