import JsonColumn from 'src/infra/shared/transformer/text-json.transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
} from 'typeorm';

@Entity({ name: 'static' })
export class Static extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'varchar'})
  key: string;

  @Column({ type: 'text', transformer: new JsonColumn(), nullable: true })
  value: any;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: string;
}
