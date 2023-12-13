import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Page } from './page.entity';
import { PageService } from './page.service';
import { PageController } from './page.controller';
import { PageContentModule } from '../page-content/page-content.module';

@Module({
  imports: [TypeOrmModule.forFeature([Page]),PageContentModule],
  controllers: [PageController],
  providers: [PageService],
  exports: [PageService],
})
export class PageModule {}
