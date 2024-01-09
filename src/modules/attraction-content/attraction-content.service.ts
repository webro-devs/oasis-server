import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CreateAttractionContentDto } from './dto';
import { AttractionContent } from './attraction-content.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TagService } from '../tag/tag.service';
import { Attraction } from '../attraction/attraction.entity';
import { TagTagDto } from 'src/infra/shared/dto';

@Injectable()
export class AttractionContentService {
  constructor(
    @InjectRepository(AttractionContent)
    private readonly attrRepo: Repository<AttractionContent>,
    private readonly tagService: TagService,
  ) {}

  async getById(id:string){
    return await this.attrRepo.findOne({
      where:{id},
      relations:{
        tags:true
      }
    })
  }

  async deleteOne(id: string) {
    const response = await this.attrRepo.delete(id).catch(() => {
      throw new NotFoundException('data not found');
    });
    return response;
  }

  async change(values, attraction: Attraction) {
    const newContents = values.filter((dc) => !dc.id);
    const olderContents = values.filter((dc) => dc.id);

    await Promise.all(
      olderContents.map(async (value) => {
        delete value.tags
        await this.attrRepo.update({ id: value.id }, { ...value });
      }),
    );

    newContents.length ? await this.create(newContents, attraction) : null;
  }

  async create(values: CreateAttractionContentDto[], attraction: Attraction) {
    await Promise.all(
      values.map(async (value) => {
       await this.createContent(value,attraction)
      }),
    );
  }

  async createContent(value: CreateAttractionContentDto, attraction: Attraction) {
    let tags = [];

    if (value.tags.length) {
      tags = await this.tagService.getMoreByIds(value.tags);
    }

    const data = this.attrRepo.create({ ...value, attraction, tags });

    await this.attrRepo.save(data);
  }

  async addTag(values: TagTagDto) {
    const data = await this.getById(values.id);
    const tag = await this.tagService.getOne(values.tagId);
    data.tags.push(tag);

    await this.attrRepo.save(data);

    return data;
  }

  async removeTag(values: TagTagDto) {
    const data = await this.getById(values.id);

    data.tags = data.tags.length
      ? data.tags.filter((t) => t.id != values.tagId)
      : [];

    await this.attrRepo.save(data);

    return data;
  }
}
