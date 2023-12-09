import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('attraction')
export class Attraction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  title: string;
}
