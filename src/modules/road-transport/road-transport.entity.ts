import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Transport } from '../transport/transport.entity';
import JsonColumn from 'src/infra/shared/transformer/text-json.transformer';

@Entity('road_transport')
export class RoadTransport {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', transformer: new JsonColumn(), nullable: true })
  type: {langCode:string,type:string}[];

  @Column({type:'varchar',nullable:true})
  seat: string;

  @Column({type:'varchar',nullable:true})
  bag: string

  @Column({type:'varchar',nullable:true})
  photo: string

  @ManyToOne(()=>Transport, transport=>transport.roadTransports,{
    onDelete:"CASCADE",
    cascade:true
  })
  @JoinColumn()
  transport: Transport
}
