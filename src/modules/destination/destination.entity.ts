import { Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Page } from '../page/page.entity';

@Entity('destination')
export class Destination {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(()=> Page, page=> page.destination)
  page: Page
}
