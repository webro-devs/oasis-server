import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import JsonColumn from 'src/infra/shared/transformer/text-json.transformer';
import { Tour } from '../tour/tour.entity';

@Entity('tour_price')
export class TourPrice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', transformer: new JsonColumn(), nullable: true })
  person: {langCode:string,person:string}[];

  @Column({type:'varchar',nullable:true})
  econome: string;

  @Column({type:'varchar',nullable:true})
  comfort: string

  @Column({type:'varchar',nullable:true})
  deluxe: string

  @ManyToOne(()=>Tour, transport=>transport.price,{
    onDelete:"CASCADE",
    cascade:true
  })
  @JoinColumn()
  tour: Tour
}
