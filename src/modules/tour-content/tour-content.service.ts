import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UpdateTourContentDto, CreateTourContentDto } from './dto';
import { TourContent } from './tour-content.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TagService } from '../tag/tag.service';

@Injectable()
export class TourContentService {
  constructor(
    @InjectRepository(TourContent)
    private readonly eventContRepo: Repository<TourContent>,
    private readonly tagService: TagService,
  ) {}

  async deleteOne(id: string) {
    const response = await this.eventContRepo.delete(id).catch(() => {
      throw new NotFoundException('data not found');
    });
    return response;
  }

  async change(values: UpdateTourContentDto[], data) {
    const newContents = values.filter((dc) => !dc.id);
    const olderContents = values.filter((dc) => dc.id);

    await Promise.all(
      olderContents.map(async (value) => {
        const tags = await this.tagService.getMoreByIds(value.tags);
        await this.eventContRepo.update({ id: value.id }, { ...value, tags });
      }),
    );

    newContents.length ? await this.create(newContents, data) : null;
  }

  async create(values: CreateTourContentDto[], data) {
    await Promise.all(
      values.map(async (value) => {
        let tags = []
        if(value.tags.length){
          tags = await this.tagService.getMoreByIds(value.tags);
        }

        await this.eventContRepo
          .createQueryBuilder()
          .insert()
          .into(TourContent)
          .values({...value,tags,...data} as unknown as TourContent)
          .execute();
      }),
    );
  }
}
