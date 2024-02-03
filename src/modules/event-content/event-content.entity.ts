import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Tag } from '../tag/tag.entity';
import { Event } from '../event/event.entity';

@Entity('event_content')
export class EventContent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type:"text"})
  title: string;

  @Column({type:"text"})
  description: string;

  @Column({type:"varchar", nullable:true})
  langCode: string;

  @ManyToMany(()=> Tag, tag=>tag.eventContents, {
    cascade:true,
    onDelete:"CASCADE"
  })
  @JoinTable()
  tags: Tag[]

  @ManyToOne(()=> Event, event=>event.contents,{
    onDelete:"CASCADE",
    cascade:true
  })
  @JoinColumn()
  event:Event
}
