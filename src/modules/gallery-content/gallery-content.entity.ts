import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Gallery } from '../gallery/gallery.entity';

@Entity('gallery_content')
export class GalleryContent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type:"text"})
  title: string;

  @Column({type:"text"})
  shortTitle: string;

  @Column({type:"varchar", nullable:true})
  langCode: string;

  @ManyToOne(()=> Gallery, gallery=>gallery.contents,{
    onDelete:"CASCADE",
    cascade:true
  })
  @JoinColumn()
  gallery:Gallery
}
