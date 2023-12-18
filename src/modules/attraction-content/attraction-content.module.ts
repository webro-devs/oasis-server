import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AttractionContent } from './attraction-content.entity';
import { AttractionContentService } from './attraction-content.service';
import { TagModule } from '../tag/tag.module';

@Module({
  imports: [TypeOrmModule.forFeature([AttractionContent]),TagModule],
  providers: [AttractionContentService],
  exports: [AttractionContentService],
})
export class AttractionContentModule {}
