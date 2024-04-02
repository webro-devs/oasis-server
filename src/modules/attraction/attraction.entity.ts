import { AttractionType } from 'src/infra/shared/type';
import { Column, Entity, Generated, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AttractionContent } from '../attraction-content/attraction-content.entity';
import JsonColumn from 'src/infra/shared/transformer/text-json.transformer';

@Entity('attraction')
@Index(["slug"], { unique: true })
export class Attraction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Generated('increment')
  @Column({type:"int",nullable:true })
  index:number

  @Column('varchar')
  type: AttractionType;

  @Column({type:'int', default:0})
  views: number;

  @Column({type:'varchar', nullable:true})
  url: string;

  @Column({type:'varchar', nullable:true})
  slug: string;

  @Column({type:"varchar",nullable:true})
  photo: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: string;

  @Column({ type: 'text', transformer: new JsonColumn(), nullable: true })
  descImages: string[]

  @OneToMany(()=>AttractionContent, attr=>attr.attraction)
  contents: AttractionContent[]
}
