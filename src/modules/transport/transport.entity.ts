import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Page } from '../page/page.entity';
import { RoadTransport } from '../road-transport/road-transport.entity';
import { TransportType } from 'src/infra/shared/type';

@Entity('transport')
export class Transport {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type:'varchar'})
  type:TransportType

  @Column({type:'int', default:0})
  views: number;

  @OneToOne(()=> Page, page=> page.transport)
  page: Page

  @OneToMany(()=>RoadTransport, roadTrans=>roadTrans.transport)
  roadTransports: RoadTransport[]
}
