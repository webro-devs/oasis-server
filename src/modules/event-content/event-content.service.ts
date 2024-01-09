import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import {  CreateEventContentDto } from './dto';
import { EventContent } from './event-content.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TagService } from '../tag/tag.service';
import { Event } from '../event/event.entity';
import { TagTagDto } from 'src/infra/shared/dto';

@Injectable()
export class EventContentService {
  constructor(
    @InjectRepository(EventContent)
    private readonly eventContRepo: Repository<EventContent>,
    private readonly tagService: TagService,
  ) {}

  async getById(id:string){
    return await this.eventContRepo.findOne({
      where:{id},
      relations:{
        tags:true
      }
    })
  }

  async deleteOne(id: string) {
    const response = await this.eventContRepo.delete(id).catch(() => {
      throw new NotFoundException('data not found');
    });
    return response;
  }

  async change(values, event: Event) {
    const newContents = values.filter((dc) => !dc.id);
    const olderContents = values.filter((dc) => dc.id);

    await Promise.all(
      olderContents.map(async (value) => {
        delete value.tags
        await this.eventContRepo.update({ id: value.id }, { ...value });
      }),
    );

    newContents.length ? await this.create(newContents, event) : null;
  }

  async create(values: CreateEventContentDto[], event: Event) {
    await Promise.all(
      values.map(async (value) => {
        await this.createContent(value, event);
      }),
    );
  }

  async createContent(value: CreateEventContentDto, event: Event) {
    let tags = [];

    if (value.tags.length) {
      tags = await this.tagService.getMoreByIds(value.tags);
    }

    const data = this.eventContRepo.create({ ...value, event, tags });

    await this.eventContRepo.save(data);
  }

  async addTag(values: TagTagDto) {
    const data = await this.getById(values.id);
    const tag = await this.tagService.getOne(values.tagId);
    data.tags.push(tag);

    await this.eventContRepo.save(data);

    return data;
  }

  async removeTag(values: TagTagDto) {
    const data = await this.getById(values.id);

    data.tags = data.tags.length
      ? data.tags.filter((t) => t.id != values.tagId)
      : [];

    await this.eventContRepo.save(data);

    return data;
  }
}
