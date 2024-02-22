import { Column, Entity, Generated, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TourContent } from '../tour-content/tour-content.entity';
import { TourCategory } from '../tour-category/tour-category.entity';
import { Destination } from '../destination/destination.entity';
import { Tag } from '../tag/tag.entity';
import { TourPrice } from '../tour-price/tour-price.entity';
import { TourItinerary } from '../tour-itinerary/tour-itinerary.entity';
import { TourRoute } from '../tur-route/tur-route.entity';

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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: string;

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

  @OneToMany(()=>TourContent, tourCon=>tourCon.tourAbout)
  about: TourContent[]

  @OneToMany(()=>TourItinerary, tourCon=>tourCon.tour)
  itinerary: TourItinerary[]

  @OneToMany(()=>TourContent, tourCon=>tourCon.tourSpecification)
  specification: TourContent[]

  @OneToMany(()=>TourContent, tourCon=>tourCon.tourName)
  name: TourContent[]
  
  @OneToMany(()=>TourContent, tourCon=>tourCon.tourBook)
  book: TourContent[]

  @OneToMany(()=>TourPrice,tourPrice=>tourPrice.tour)
  price: TourPrice[]

  @ManyToOne(()=>TourCategory, tourCat=> tourCat.tours)
  @JoinColumn()
  tourCategory:TourCategory

  @ManyToOne(()=>Destination, destination=>destination.tours,{
    onDelete:"SET NULL",
    cascade:true
  })
  @JoinColumn()
  destination: Destination

  @ManyToMany(()=>TourRoute, tourRoute=>tourRoute.tours,{
    onDelete:"CASCADE",
    cascade:true
  })
  @JoinTable()
  routes: Tag[]
}
