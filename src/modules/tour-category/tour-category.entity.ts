import { Column, Entity, Generated, Index, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Page } from '../page/page.entity';
import { Tour } from '../tour/tour.entity';
import JsonColumn from 'src/infra/shared/transformer/text-json.transformer';

@Entity('tour_category')
@Index(["slug"], { unique: true })
export class TourCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Generated('increment')
  @Column({type:"int",nullable:true })
  order:number

  @Column({type:'varchar', nullable:true})
  slug: string;

  @Column({type:'varchar',nullable:true})
  photo:string

  @Column({type:'varchar',nullable:true})
  url:string

  @Column({type:'int', default:0})
  views: number;

  @Column({ type: 'text', transformer: new JsonColumn(), nullable: true })
  descImages: string[]

  @OneToOne(()=> Page, page=> page.tourCategory)
  page: Page

  @OneToMany(()=>Tour, tour=>tour.tourCategory)
  tours: Tour[]
}
