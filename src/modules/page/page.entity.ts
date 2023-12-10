import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Destination } from '../destination/destination.entity';
import { PageContent } from '../page-content/page-content.entity';

@Entity('page')
export class Page {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

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
}
