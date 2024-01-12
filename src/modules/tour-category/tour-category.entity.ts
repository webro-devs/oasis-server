import { Column, Entity, Generated, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Page } from '../page/page.entity';
import { Tour } from '../tour/tour.entity';

@Entity('tour_category')
export class TourCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Generated('increment')
  @Column({type:"int",nullable:true })
  index:number

  @Column({type:'varchar'})
  type:string

  @Column({type:'varchar',nullable:true})
  photo:string

  @Column({type:'varchar',nullable:true})
  url:string

  @OneToOne(()=> Page, page=> page.tourCategory)
  page: Page

  @OneToMany(()=>Tour, tour=>tour.tourCategory)
  tour: Tour
}
