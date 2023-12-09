import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('event')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  title: string;
}
