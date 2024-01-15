import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
} from 'typeorm';

@Entity({ name: 'language' })
export class Language extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'varchar'})
  key: string;

  @Column({type: 'varchar', nullable:true})
  title: string;

  @Column({type: 'varchar'})
  photo: string;
}
