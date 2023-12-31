import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UpdateEventContentDto, CreateEventContentDto } from './dto';
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

  async deleteOne(id: string) {
    const response = await this.eventContRepo.delete(id).catch(() => {
      throw new NotFoundException('data not found');
    });
    return response;
  }

  async change(values: UpdateEventContentDto[], event: string) {
    const newContents = values.filter((dc) => !dc.id);
    const olderContents = values.filter((dc) => dc.id);

    await Promise.all(
      olderContents.map(async (value) => {
        const tags = await this.tagService.getMoreByIds(value.tags);
        await this.eventContRepo.update({ id: value.id }, { ...value, tags });
      }),
    );

    newContents.length ? await this.create(newContents, event) : null;
  }

  async create(values: CreateEventContentDto[], event: string) {
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
