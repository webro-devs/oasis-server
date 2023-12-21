import { Injectable, NotFoundException } from '@nestjs/common';
import { In, Repository } from 'typeorm';

import { UpdateAttractionContentDto, CreateAttractionContentDto } from './dto';
import { EventContent } from './event-content.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TagService } from '../tag/tag.service';

@Injectable()
export class EventContentService {
  constructor(
    @InjectRepository(EventContent)
    private readonly eventContRepo: Repository<EventContent>,
    private readonly tagService: TagService,
  ) {}

  async getAll(ids:string[], langCode:string){
    const data = await this.eventContRepo.find({
      where:{
        langCode,
        event:{
          id: In(ids)
        },
      },
      relations:{
        event:true
      }
    })
    return data
  }

  async getOne(id: string,langCode:string) {
    const data = await this.eventContRepo
      .findOne({
        where: { 
          event:{
            id
          },
          langCode
         },
         relations:{
          event:true
         }
      })
      .catch(() => {
        throw new NotFoundException('data not found');
      });

    return data;
  }

  async deleteOne(id: string) {
    const response = await this.eventContRepo.delete(id).catch(() => {
      throw new NotFoundException('data not found');
    });
    return response;
  }

  async change(values: UpdateAttractionContentDto[], attraction: string) {
    const newContents = values.filter((dc) => !dc.id);
    const olderContents = values.filter((dc) => dc.id);

    await Promise.all(
      olderContents.map(async (value) => {
        const tags = await this.tagService.getMoreByIds(value.tags);
        await this.eventContRepo.update({ id: value.id }, { ...value, tags });
      }),
    );

    newContents.length ? await this.create(newContents, attraction) : null;
  }

  async create(values: CreateAttractionContentDto[], event: string) {
    await Promise.all(
      values.map(async (value) => {
        let tags = []
        if(value.tags.length){
          tags = await this.tagService.getMoreByIds(value.tags);
        }

        await this.eventContRepo
          .createQueryBuilder()
          .insert()
          .into(EventContent)
          .values({...value,tags,event} as unknown as EventContent)
          .execute();
      }),
    );
  }
}
