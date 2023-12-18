import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Page } from '../page/page.entity';
import { DestinationType } from '../destination-type/destination-type.entity';

@Entity('destination')
export class Destination {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(()=> Page, page=> page.destination)
  page: Page

  @OneToMany(()=>DestinationType, destType=>destType.destination)
  destinationTypes: DestinationType[]
}
