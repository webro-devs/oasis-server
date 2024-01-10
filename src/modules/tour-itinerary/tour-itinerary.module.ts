import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TourItinerary } from './tour-itinerary.entity';
import { TourItineraryService } from './tour-itinerary.service';
import { TagModule } from '../tag/tag.module';
import { TourItineraryContent } from './tour-itinerary-content.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TourItinerary,TourItineraryContent]),TagModule],
  providers: [TourItineraryService],
  exports: [TourItineraryService],
})
export class TourItineraryModule {}
