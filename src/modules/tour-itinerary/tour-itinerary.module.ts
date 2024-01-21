import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TourItinerary } from './tour-itinerary.entity';
import { TourItineraryService } from './tour-itinerary.service';
import { TourItineraryContent } from './tour-itinerary-content.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TourItinerary,TourItineraryContent])],
  providers: [TourItineraryService],
  exports: [TourItineraryService],
})
export class TourItineraryModule {}
