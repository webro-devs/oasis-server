import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Page } from '../page/page.entity';
import { DestinationContent } from '../destination-content/destination-content.entity';

@Entity('destination')
export class Destination {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(()=> DestinationContent, destCon=> destCon.destination)
  contents: DestinationContent[]

  @OneToOne(()=> Page, page=> page.destination,{
    onDelete:"SET NULL",
    cascade:true
  })
  @JoinColumn()
  page: Page
}
