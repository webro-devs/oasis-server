import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TourContent } from './tour-content.entity';
import { TourContentService } from './tour-content.service';
import { TagModule } from '../tag/tag.module';

@Module({
  imports: [TypeOrmModule.forFeature([TourContent]),TagModule],
  providers: [TourContentService],
  exports: [TourContentService],
})
export class TourContentModule {}
