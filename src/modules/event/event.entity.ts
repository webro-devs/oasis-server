import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EventContent } from '../event-content/event-content.entity';

@Entity('event')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(()=>EventContent, eventContent=>eventContent.event)
  contents: EventContent
}
