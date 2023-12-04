import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToMany,
} from 'typeorm';
import { PageContent } from '../page-content/page-content.entity';

@Entity({ name: 'tag' })
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    name: 'title',
  })
  title: string;

  @ManyToMany(()=>PageContent, page=> page.tags, {
    onDelete:"CASCADE"
  })
  pageContents: PageContent[]
}
