import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AttractionContent } from './attraction-content.entity';
import { AttractionContentService } from './attraction-content.service';

@Module({
  imports: [TypeOrmModule.forFeature([AttractionContent])],
  providers: [AttractionContentService],
  exports: [AttractionContentService],
})
export class AttractionContentModule {}
