import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TourContent } from '../tour-content/tour-content.entity';
import { TourCategory } from '../tour-category/tour-category.entity';

@Entity('tour')
export class Tour {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type:'text',array:true,nullable:true})
  photoGallery: string[];

  @Column({type:'varchar',nullable:true})
  url: string;

  @OneToOne(()=>TourContent, tourCon=>tourCon.tourAbout)
  about: TourContent

  @OneToOne(()=>TourContent, tourCon=>tourCon.tourItineary)
  itinerary: TourContent

  @OneToOne(()=>TourContent, tourCon=>tourCon.tourSpecification)
  specification: TourContent
  
  @OneToOne(()=>TourContent, tourCon=>tourCon.tourBook)
  book: TourContent

  @ManyToOne(()=>TourCategory, tourCat=> tourCat.tour)
  @JoinColumn()
  tourCategory:TourCategory
}
