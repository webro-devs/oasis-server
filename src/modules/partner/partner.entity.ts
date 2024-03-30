import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
} from 'typeorm';

@Entity({ name: 'partner' })
export class Partner extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'varchar',nullable:true})
  link: string;

  @Column({type: 'varchar',nullable:true})
  logo: string;
}
