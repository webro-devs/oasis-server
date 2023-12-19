import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToMany,
} from 'typeorm';
import { PageContent } from '../page-content/page-content.entity';
import { AttractionContent } from '../attraction-content/attraction-content.entity';
import { EventContent } from '../event-content/event-content.entity';

@Entity({ name: 'tag' })
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'varchar'})
  title: string;

  @ManyToMany(()=>PageContent, page=> page.tags, {
    onDelete:"CASCADE"
  })
  pageContents: PageContent[]

  @ManyToMany(()=>AttractionContent, attraction=> attraction.tags, {
    onDelete:"CASCADE"
  })
  attractionContents: AttractionContent[]

  @ManyToMany(()=>EventContent, event=> event.tags, {
    onDelete:"CASCADE"
  })
  eventContents: EventContent[]
}
