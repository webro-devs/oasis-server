import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Tag } from '../tag/tag.entity';
import { Destination } from '../destination/destination.entity';

@Entity('destination_content')
export class DestinationContent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type:'varchar', nullable:true})
  title: string;

  @Column({type:"text", nullable:true})
  description: string;

  @Column({type:"text", nullable:true})
  descriptionPage: string;

  @Column({type:"varchar"})
  langCode: string;

  @ManyToMany(()=> Tag, tag=>tag.destinationContents, {
    cascade:true,
    onDelete:"CASCADE"
  })
  @JoinTable()
  tags: Tag[]

  @ManyToOne(()=> Destination, dest=> dest.contents,{
    onDelete:"CASCADE",
    cascade:true
  })
  @JoinColumn()
  destination: Destination
}
