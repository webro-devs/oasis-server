import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToMany,
  Index,
} from 'typeorm';

import { Tour } from '../tour/tour.entity';

@Entity({ name: 'tour_route' })
@Index(["title"])
export class TourRoute extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'varchar'})
  title: string;

  @Column({type: 'text', nullable:true})
  description: string;

  @Column({type: 'varchar'})
  langCode: string;

  @Column({type: 'varchar'})
  type: string;

  @ManyToMany(()=>Tour, event=> event.routes, {
    onDelete:"CASCADE"
  })
  tours: Tour[]
}
