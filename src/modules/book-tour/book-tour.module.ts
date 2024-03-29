import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookTour } from './book-tour.entity';
import { BookTourController } from './book-tour.controller';
import { BookTourService } from './book-tour.service';

@Module({
  imports: [TypeOrmModule.forFeature([BookTour])],
  controllers: [BookTourController],
  providers: [BookTourService],
  exports: [BookTourService],
})
export class BookTourModule {}
