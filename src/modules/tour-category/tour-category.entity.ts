import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Page } from '../page/page.entity';

@Entity('tour_category')
export class TourCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type:'varchar'})
  type:string

  @OneToOne(()=> Page, page=> page.tourCategory)
  page: Page
}
