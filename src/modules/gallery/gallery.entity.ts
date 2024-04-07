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

  @Column({ type: 'text', transformer: new JsonColumn(), nullable: true })
  images: string[]

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;

  @Column({type:'varchar', nullable:true})
  slug: string;

  @Column({type:'varchar',nullable:true})
  url:string

  @OneToMany(()=>GalleryContent, galleryCon=>galleryCon.gallery)
  contents: GalleryContent[]
}
