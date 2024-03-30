import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
} from 'typeorm';

@Entity({ name: 'book_tour' })
export class BookTour extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'varchar', nullable:true})
  name: string;

  @Column({type: 'varchar', nullable:true})
  email: string;

  @Column({type: 'varchar', nullable:true})
  startDate: string;

  @Column({type: 'varchar', nullable:true})
  flightDetail: string;

  @Column({type: 'varchar', nullable:true})
  count: string;

  @Column({type: 'varchar', nullable:true})
  roomType: string;

  @Column({type: 'text', nullable:true})
  description: string;
}
