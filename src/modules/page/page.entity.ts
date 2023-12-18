import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Destination } from '../destination/destination.entity';
import { PageContent } from '../page-content/page-content.entity';
import { DestinationType } from '../destination-type/destination-type.entity';

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
    onDelete:"SET NULL"
  })
  destination: Destination

  @OneToOne(()=> DestinationType, destType=>destType.page, {
    onDelete:"SET NULL"
  })
  destinationType: DestinationType
}
