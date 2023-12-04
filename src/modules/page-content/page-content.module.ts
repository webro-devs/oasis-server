import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PageContent } from './page-content.entity';
import { PageContentService } from './page-content.service';
import { PageContentController } from './page-content.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PageContent])],
  controllers: [PageContentController],
  providers: [PageContentService],
  exports: [PageContentService],
})
export class PageContentModule {}
