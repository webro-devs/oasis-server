import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

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
}
