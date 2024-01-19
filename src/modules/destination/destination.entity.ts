import { Column, Entity, Generated, Index, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Page } from '../page/page.entity';
import { Tour } from '../tour/tour.entity';

@Entity('destination')
@Index(["slug"], { unique: true })
export class Destination {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Generated('increment')
  @Column({type:"int",nullable:true })
  index:number

  @Column({type:'varchar', nullable:true})
  title: string;

  @Column({type:'varchar', nullable:true})
  slug: string;

  @OneToOne(()=> Page, page=> page.destination)
  page: Page

  @OneToMany(()=>Tour, tour=>tour.destination)
  tours: Tour[]
}
