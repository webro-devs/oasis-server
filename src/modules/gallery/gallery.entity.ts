import JsonColumn from 'src/infra/shared/transformer/text-json.transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { GalleryContent } from '../gallery-content/gallery-content.entity';

@Entity({ name: 'gallery' })
export class Gallery extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'text', nullable:true})
  title: string;

  @Column({type: 'varchar',nullable:true})
  shortTitle: string;

  @Column({ type: 'text', transformer: new JsonColumn(), nullable: true })
  images: string[]

  @OneToMany(()=>GalleryContent, galleryCon=>galleryCon.gallery)
  contents: GalleryContent[]
}
