import JsonColumn from 'src/infra/shared/transformer/text-json.transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
} from 'typeorm';

@Entity({ name: 'gallery' })
export class Gallery extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'text', nullable:true})
  title: string;

  @Column({type: 'varchar',nullable:true})
  shortTitle: string;

  @Column({ type: 'text', transformer: new JsonColumn(), nullable: true })
  images: string[]
}
