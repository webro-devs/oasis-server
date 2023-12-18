import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Page } from '../page/page.entity';
import { Destination } from '../destination/destination.entity';

@Entity('destination_type')
export class DestinationType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(()=> Page, page=> page.destinationType)
  page: Page

  @ManyToOne(()=>Destination, destination=>destination.destinationTypes,{
    onDelete:"CASCADE",
    cascade:true
  })
  @JoinColumn()
  destination: Destination
}
