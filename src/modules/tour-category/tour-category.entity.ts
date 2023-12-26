import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Page } from '../page/page.entity';
import { Tour } from '../tour/tour.entity';

@Entity('tour_category')
export class TourCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type:'varchar'})
  type:string

  @OneToOne(()=> Page, page=> page.tourCategory)
  page: Page

  @OneToMany(()=>Tour, tour=>tour.tourCategory)
  tour: Tour
}
