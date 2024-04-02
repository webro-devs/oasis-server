import { Column, Entity, Index, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Page } from '../page/page.entity';
import { RoadTransport } from '../road-transport/road-transport.entity';
import { TransportType } from 'src/infra/shared/type';
import JsonColumn from 'src/infra/shared/transformer/text-json.transformer';

@Entity('transport')
@Index(["type"], { unique: true })
export class Transport {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type:'varchar'})
  type:TransportType

  @Column({type:'int', default:0})
  views: number;

  @Column({ type: 'text', transformer: new JsonColumn(), nullable: true })
  descImages: string[]

  @OneToOne(()=> Page, page=> page.transport)
  page: Page

  @OneToMany(()=>RoadTransport, roadTrans=>roadTrans.transport)
  roadTransports: RoadTransport[]
}
