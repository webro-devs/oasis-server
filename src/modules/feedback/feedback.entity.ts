import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('feedback')
export class Feedback {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type:'text', nullable:true})
  description: string;

  @Column({type:'varchar',nullable:true})
  link: string;

  @Column({type:'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  date: string

  @Column({type:'boolean', default:false})
  isActive: boolean = false
}
