import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Attraction } from './attraction.entity';
import { AttractionService } from './attraction.service';
import { AttractionController } from './attraction.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Attraction])],
  controllers: [AttractionController],
  providers: [AttractionService],
  exports: [AttractionService],
})
export class AttractionModule {}
