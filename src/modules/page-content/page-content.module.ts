import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PageContent } from './page-content.entity';
import { PageContentService } from './page-content.service';
import { TagModule } from '../tag/tag.module';

@Module({
  imports: [TypeOrmModule.forFeature([PageContent]),TagModule],
  providers: [PageContentService],
  exports: [PageContentService],
})
export class PageContentModule {}
