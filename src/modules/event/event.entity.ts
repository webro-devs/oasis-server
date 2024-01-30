import { Column, Entity, Generated, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EventContent } from '../event-content/event-content.entity';

@Entity('event')
@Index(["slug"], { unique: true })
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Generated('increment')
  @Column({type:"int",nullable:true })
  index:number

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: string;

  @Column({type:"varchar",nullable:true})
  photo: string;

  @Column({type:'varchar', nullable:true})
  slug: string;

  @Column({type:'int', default:0})
  views: number;

  @Column({type:'varchar', nullable:true})
  url:string

  @OneToMany(()=>EventContent, eventContent=>eventContent.event)
  contents: EventContent[]
}
