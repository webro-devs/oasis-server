import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity('feedback')
export class Feedback {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Generated('increment')
  @Column({type:"int",nullable:true })
  index:number

  @Column({type:'text', nullable:true})
  description: string;

  @Column({type:'varchar',nullable:true})
  name: string;

  @Column({type:'varchar',nullable:true})
  link: string;

  @Column({type:'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  date: string

  @Column({type:'boolean', default:false})
  isActive: boolean = false
}
