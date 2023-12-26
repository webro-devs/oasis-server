import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Destination } from '../destination/destination.entity';
import { PageContent } from '../page-content/page-content.entity';
import { Transport } from '../transport/transport.entity';
import { TourCategory } from '../tour-category/tour-category.entity';

@Entity('page')
export class Page {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type:'varchar',nullable:true})
  url:string

  @Column({type:'boolean', default:true})
  isTopic: boolean

  @ManyToMany(() => Page, (page) => page.pagesOnLeft)
  @JoinTable()
  pagesOnLeft: Page[];

  @ManyToMany(() => Page, (page) => page.pagesOnRight)
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
