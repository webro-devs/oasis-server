import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TourContent } from './tour-content.entity';
import { TourContentService } from './tour-content.service';

@Module({
  imports: [TypeOrmModule.forFeature([TourContent])],
  providers: [TourContentService],
  exports: [TourContentService],
})
export class TourContentModule {}
