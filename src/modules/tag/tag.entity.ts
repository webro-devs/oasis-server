import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToMany,
} from 'typeorm';
import { PageContent } from '../page-content/page-content.entity';
import { DestinationContent } from '../destination-content/destination-content.entity';

@Entity({ name: 'tag' })
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'varchar'})
  title: string;

  @ManyToMany(()=>PageContent, pageContent=> pageContent.tags, {
    onDelete:"CASCADE"
  })
  pageContents: PageContent[]

  @ManyToMany(()=>DestinationContent, destinationContent=> destinationContent.tags, {
    onDelete:"CASCADE"
  })
  destinationContents: DestinationContent[]
}
