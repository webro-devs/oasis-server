import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PageContent } from './page-content.entity';
import { PageContentService } from './page-content.service';

@Module({
  imports: [TypeOrmModule.forFeature([PageContent])],
  providers: [PageContentService],
  exports: [PageContentService],
})
export class PageContentModule {}
