import { Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Page } from '../page/page.entity';
import { Tour } from '../tour/tour.entity';

@Entity('destination')
export class Destination {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(()=> Page, page=> page.destination)
  page: Page

  @OneToMany(()=>Tour, tour=>tour.destination)
  tours: Tour[]
}
