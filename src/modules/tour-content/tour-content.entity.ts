import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Tag } from '../tag/tag.entity';

import { Tour } from '../tour/tour.entity';

@Entity('tour_content')
export class TourContent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type:"text", nullable:true})
  title: string;

  @Column({type:"text", nullable:true})
  description: string;

  @Column({type:"varchar", nullable:true})
  langCode: string;

  @ManyToMany(()=> Tag, tag=>tag.tourContents, {
    cascade:true,
    onDelete:"CASCADE"
  })
  @JoinTable()
  tags: Tag[]

  @OneToOne(()=> Tour, event=>event.about,{
    onDelete:"CASCADE",
    cascade:true
  })
  @JoinColumn()
  tourAbout:Tour

  @OneToOne(()=> Tour, event=>event.itinerary,{
    onDelete:"CASCADE",
    cascade:true
  })
  @JoinColumn()
  tourItineary:Tour

  @OneToOne(()=> Tour, event=>event.specification,{
    onDelete:"CASCADE",
    cascade:true
  })
  @JoinColumn()
  tourSpecification:Tour

  @OneToOne(()=> Tour, event=>event.book,{
    onDelete:"CASCADE",
    cascade:true
  })
  @JoinColumn()
  tourBook:Tour

  @OneToOne(()=> Tour, tour=>tour.name,{
    onDelete:"CASCADE",
    cascade:true
  })
  @JoinColumn()
  tourName:Tour
}
