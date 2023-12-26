import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TourCategory } from './tour-category.entity';
import { TourCategoryService } from './tour-category.service';
import { TourCategoryController } from './tour-category.controller';
import { PageModule } from '../page/page.module';

@Module({
  imports: [TypeOrmModule.forFeature([TourCategory]),PageModule],
  controllers: [TourCategoryController],
  providers: [TourCategoryService],
  exports: [TourCategoryService],
})
export class TourCategoryModule {}
