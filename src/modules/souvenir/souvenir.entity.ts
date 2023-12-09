import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('souvenir')
export class Souvenir {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  title: string;
}
