import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Page } from '../page/page.entity';
import { Tag } from '../tag/tag.entity';

@Entity('page_content')
export class PageContent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type:"text", nullable:true})
  title: string;

  @Column({type:"text", nullable:true})
  description: string;

  @Column({type:"varchar"})
  langCode: string;

  @ManyToOne(()=> Page, page=>page)
  @JoinColumn()
  page: Page

  @ManyToMany(()=> Tag, tag=>tag, {
    cascade:true,
    onDelete:"CASCADE"
  })
  @JoinTable()
  tags: Tag[]
}
