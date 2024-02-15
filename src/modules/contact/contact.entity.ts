import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
} from 'typeorm';

@Entity({ name: 'contact' })
export class Contact extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'varchar', nullable:true})
  title:string

  @Column({type: 'varchar'})
  address:string

  @Column({type: 'varchar'})
  email:string

  @Column({type: 'varchar'})
  phone:string

  @Column({type: 'varchar'})
  website:string

  @Column({type: 'varchar'})
  workingDays:string

  @Column({type: 'varchar'})
  workingHours:string

  @Column({type: 'varchar', unique:true})
  langCode:string
}
