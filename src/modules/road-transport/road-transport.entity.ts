import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Transport } from '../transport/transport.entity';

@Entity('road_transport')
export class RoadTransport {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type:'simple-json',array:true, nullable:true})
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
