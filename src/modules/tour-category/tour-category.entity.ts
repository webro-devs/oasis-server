import { Column, Entity, Generated, Index, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Page } from '../page/page.entity';
import { Tour } from '../tour/tour.entity';

@Entity('tour_category')
@Index(["slug"], { unique: true })
export class TourCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Generated('increment')
  @Column({type:"int",nullable:true })
  index:number

  @Column({type:'varchar', nullable:true})
  slug: string;

  @Column({type:'varchar',nullable:true})
  photo:string

  @Column({type:'varchar',nullable:true})
  url:string

  @Column({type:'int', default:0})
  views: number;

  @OneToOne(()=> Page, page=> page.tourCategory)
  page: Page

  @OneToMany(()=>Tour, tour=>tour.tourCategory)
  tours: Tour[]
}
