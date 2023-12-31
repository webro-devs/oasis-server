import { Column, Entity, Generated, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Page } from '../page/page.entity';
import { Tour } from '../tour/tour.entity';

@Entity('destination')
export class Destination {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Generated('increment')
  @Column({type:"int",nullable:true })
  index:number

  @OneToOne(()=> Page, page=> page.destination)
  page: Page

  @OneToMany(()=>Tour, tour=>tour.destination)
  tours: Tour[]
}
