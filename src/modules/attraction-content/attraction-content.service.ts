import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UpdateAttractionContentDto, CreateAttractionContentDto } from './dto';
import { AttractionContent } from './attraction-content.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TagService } from '../tag/tag.service';
import { Attraction } from '../attraction/attraction.entity';

@Injectable()
export class AttractionContentService {
  constructor(
    @InjectRepository(AttractionContent)
    private readonly attrRepo: Repository<AttractionContent>,
    private readonly tagService: TagService
  ) {}

  async getOne(id: string) {
    const data = await this.attrRepo
      .findOne({
        where: { id },
      })
      .catch(() => {
        throw new NotFoundException('data not found');
      });

    return data;
  }

  async deleteOne(id: string) {
    const response = await this.attrRepo.delete(id).catch(() => {
      throw new NotFoundException('data not found');
    });
    return response;
  }

  async change(
    values: UpdateAttractionContentDto[],
    attraction: Attraction,
  ) {
    const newContents = values.filter((dc) => !dc.id);
    const olderContents = values.filter((dc) => dc.id);

    await Promise.all(
      olderContents.map(async (value) => {
        const tags = await this.tagService.getMoreByIds(value.tags);
        await this.attrRepo.update({ id: value.id }, { ...value, tags });
      }),
    );
    
    newContents.length ? await this.create(newContents, attraction) : null;
  }

  async create(
    values: CreateAttractionContentDto[],
    attraction: Attraction,
  ) {
    await Promise.all(
      values.map(async (value) => {
        const tags = await this.tagService.getMoreByIds(value.tags);

        const data = this.attrRepo.create({ ...value, tags, attraction });

        return await this.attrRepo.save(data);
      }),
    );
  }
}
