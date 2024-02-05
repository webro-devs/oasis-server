import { Column, Entity, Generated, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TourContent } from '../tour-content/tour-content.entity';
import { TourCategory } from '../tour-category/tour-category.entity';
import { Destination } from '../destination/destination.entity';
import { Tag } from '../tag/tag.entity';
import { TourPrice } from '../tour-price/tour-price.entity';
import { TourItinerary } from '../tour-itinerary/tour-itinerary.entity';

@Entity('tour')
@Index(["slug"], { unique: true })
export class Tour {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Generated('increment')
  @Column({type:"int",nullable:true })
  index:number

  @Column({type:'varchar', nullable:true})
  slug: string;

  @Column({type:'text',array:true,nullable:true})
  photoGallery: string[];

  @Column({type:'varchar',nullable:true})
  url: string;

  @Column({type:'varchar',nullable:true})
  photo: string;

  @Column({type:'varchar',nullable:true})
  tourPrice: string;

  @Column({type:'int', default:0})
  views: number;

  @OneToOne(()=>TourContent, tourCon=>tourCon.tourAbout)
  about: TourContent

  @OneToOne(()=>TourItinerary, tourCon=>tourCon.tour)
  itinerary: TourItinerary

  @OneToOne(()=>TourContent, tourCon=>tourCon.tourSpecification)
  specification: TourContent

  @OneToOne(()=>TourContent, tourCon=>tourCon.tourName)
  name: TourContent
  
  @OneToOne(()=>TourContent, tourCon=>tourCon.tourBook)
  book: TourContent

  @ManyToOne(()=>TourCategory, tourCat=> tourCat.tour)
  @JoinColumn()
  tourCategory:TourCategory

  @ManyToOne(()=>Destination, destination=>destination.tours,{
    onDelete:"SET NULL",
    cascade:true
  })
  @JoinColumn()
  destination: Destination

  @ManyToMany(()=>Tag, tag=>tag.tours,{
    onDelete:"CASCADE",
    cascade:true
  })
  @JoinTable()
  routes: Tag[]

  @OneToMany(()=>TourPrice,tourPrice=>tourPrice.tour)
  price: TourPrice[]
}
