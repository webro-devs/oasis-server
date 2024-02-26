import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Tag } from '../tag/tag.entity';

import { Tour } from '../tour/tour.entity';
import { TourItinerary } from './tour-itinerary.entity';

@Entity('tour_itinerary_content')
export class TourItineraryContent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type:"text",nullable:true})
  title: string;

  @Column({type:"text",nullable:true})
  description: string;

  @Column({type:"varchar", nullable:true})
  langCode: string;

  @ManyToMany(()=> Tag, tag=>tag.tourContents, {
    cascade:true,
    onDelete:"CASCADE"
  })
  @JoinTable()
  tags: Tag[]

  @ManyToOne(()=>TourItinerary, tour=>tour.contents,{
    onDelete:"CASCADE",
    cascade:true
  })
  @JoinColumn()
  tourItinerary: TourItinerary
}
