import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tour')
export class Tour {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  title: string;
}
