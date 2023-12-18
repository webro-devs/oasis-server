import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Tag } from '../tag/tag.entity';
import { Attraction } from '../attraction/attraction.entity';

@Entity('attraction_content')
export class AttractionContent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type:"text"})
  title: string;

  @Column({type:"text"})
  region: string;

  @Column({type:"text"})
  description: string;

  @ManyToMany(()=> Tag, tag=>tag.attractionContents, {
    cascade:true,
    onDelete:"CASCADE"
  })
  @JoinTable()
  tags: Tag[]

  @ManyToOne(()=> Attraction, attraction=>attraction.contents,{
    onDelete:"CASCADE",
    cascade:true
  })
  @JoinColumn()
  attraction:Attraction
}
