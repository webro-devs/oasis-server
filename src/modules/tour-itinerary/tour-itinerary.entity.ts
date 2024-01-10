import { Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Tour } from '../tour/tour.entity';
import { TourItineraryContent } from './tour-itinerary-content.entity';

@Entity('tour_itinerary')
export class TourItinerary {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(()=>Tour, tour=>tour.itinerary,{
    onDelete:"CASCADE",
    cascade:true
  })
  @JoinColumn()
  tour: Tour

  @OneToMany(()=> TourItineraryContent, tourItiCon=> tourItiCon.tourItinerary)
  contents: TourItineraryContent[]
}
