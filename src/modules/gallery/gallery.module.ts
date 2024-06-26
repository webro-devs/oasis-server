import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Gallery } from './gallery.entity';
import { GalleryController } from './gallery.controller';
import { GalleryService } from './gallery.service';
import { GalleryContentModule } from '../gallery-content/gallery-content.module';

@Module({
  imports: [TypeOrmModule.forFeature([Gallery]),GalleryContentModule],
  controllers: [GalleryController],
  providers: [GalleryService],
  exports: [GalleryService],
})
export class GalleryModule {}
