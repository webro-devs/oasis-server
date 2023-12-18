import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Page } from '../page/page.entity';
import { Tag } from '../tag/tag.entity';

@Entity('page_content')
export class PageContent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  title: string;

  @Column({ type: 'varchar', nullable: true })
  shortTitle: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  descriptionPage: string;

  @Column({ type: 'varchar' })
  langCode: string;

  @ManyToOne(() => Page, (page) => page.contents, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn()
  page: Page;

  @ManyToMany(() => Tag, (tag) => tag.pageContents, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  tags: Tag[];
}
