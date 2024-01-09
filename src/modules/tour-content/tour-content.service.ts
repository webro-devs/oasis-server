import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CreateTourContentDto } from './dto';
import { TourContent } from './tour-content.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TagService } from '../tag/tag.service';
import { Tour } from '../tour/tour.entity';
import { TagTagDto } from 'src/infra/shared/dto';

@Injectable()
export class TourContentService {
  constructor(
    @InjectRepository(TourContent)
    private readonly tourContRepo: Repository<TourContent>,
    private readonly tagService: TagService,
  ) {}

  async getById(id:string){
    return await this.tourContRepo.findOne({
      where:{id},
      relations:{
        tags:true
      }
    })
  }

  async deleteOne(id: string) {
    const response = await this.tourContRepo.delete(id).catch(() => {
      throw new NotFoundException('data not found');
    });
    return response;
  }

  async change(values , tour:Tour, type:string) {
    const newContents = values.filter((dc) => !dc.id);
    const olderContents = values.filter((dc) => dc.id);

    await Promise.all(
      olderContents.map(async (value) => {
        delete value.tags
        await this.tourContRepo.update({ id: value.id }, { ...value });
      }),
    );

    newContents.length ? await this.create(newContents, tour,type) : null;
  }

  async create(values: CreateTourContentDto[], tour: Tour,type:string) {
    await Promise.all(
      values.map(async (value) => {
        await this.createContent(value,tour,type)
      }),
    );
  }

  async createContent(value: CreateTourContentDto, tour: Tour, type:string) {
    let tags = [];

    if (value.tags.length) {
      tags = await this.tagService.getMoreByIds(value.tags);
    }
    value[type] = tour
    const data = this.tourContRepo.create({ ...value, tags });

    await this.tourContRepo.save(data);
  }

  async addTag(values: TagTagDto) {
    const data = await this.getById(values.id);
    const tag = await this.tagService.getOne(values.tagId);
    data.tags.push(tag);

    await this.tourContRepo.save(data);

    return data;
  }

  async removeTag(values: TagTagDto) {
    const data = await this.getById(values.id);

    data.tags = data.tags.length
      ? data.tags.filter((t) => t.id != values.tagId)
      : [];

    await this.tourContRepo.save(data);

    return data;
  }
}
