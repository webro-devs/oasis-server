import { Column, Entity, Generated, Index, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Destination } from '../destination/destination.entity';
import { PageContent } from '../page-content/page-content.entity';
import { Transport } from '../transport/transport.entity';
import { TourCategory } from '../tour-category/tour-category.entity';
import JsonColumn from 'src/infra/shared/transformer/text-json.transformer';

@Entity('page')
@Index(["slug"], { unique: true })
export class Page {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type:'varchar',nullable:true})
  url:string

  @Column({type:'varchar', nullable:true, unique:true})
  slug: string;

  @Column({type:'boolean', default:true})
  isTopic: boolean

  @Column({type:'int', default:0})
  views: number;

  @Generated('increment')
  @Column({type:"int",nullable:true })
  index:number

  @Column({ type: 'text', transformer: new JsonColumn(), nullable: true })
  descImages: string[]

  @ManyToMany(() => Page, (page) => page.pagesOnLeft,{
    onDelete:"CASCADE",
  })
  @JoinTable()
  pagesOnLeft: Page[];

  @ManyToMany(() => Page, (page) => page.pagesOnRight,{
    onDelete:"CASCADE",
  })
  @JoinTable()
  pagesOnRight: Page[];

  @OneToMany(()=>PageContent, pageContent=> pageContent.page)
  contents: PageContent[]

  @OneToOne(()=> Destination, destination=>destination.page, {
    onDelete:"CASCADE",
    cascade:true
  })
  @JoinColumn()
  destination: Destination

  @OneToOne(()=> Transport, transport=>transport.page, {
    onDelete:"CASCADE",
    cascade:true
  })
  @JoinColumn()
  transport: Transport

  @OneToOne(()=> TourCategory, tourCategory=>tourCategory.page, {
    onDelete:"CASCADE",
    cascade:true
  })
  @JoinColumn()
  tourCategory: TourCategory
}
