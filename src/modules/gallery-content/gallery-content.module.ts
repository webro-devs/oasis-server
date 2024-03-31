import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GalleryContent } from './gallery-content.entity';
import { GalleryContentService } from './gallery-content.service';

@Module({
  imports: [TypeOrmModule.forFeature([GalleryContent])],
  providers: [GalleryContentService],
  exports: [GalleryContentService],
})
export class GalleryContentModule {}
