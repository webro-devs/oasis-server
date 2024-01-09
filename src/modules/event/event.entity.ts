import { Column, Entity, Generated, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EventContent } from '../event-content/event-content.entity';

@Entity('event')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Generated('increment')
  @Column({type:"int",nullable:true })
  index:number

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: string;

  @Column({type:'varchar', nullable:true})
  url:string

  @OneToMany(()=>EventContent, eventContent=>eventContent.event)
  contents: EventContent
}
