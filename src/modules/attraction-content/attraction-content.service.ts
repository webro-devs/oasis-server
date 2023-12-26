import { Injectable, NotFoundException } from '@nestjs/common';
import { In, Repository } from 'typeorm';

import { UpdateAttractionContentDto, CreateAttractionContentDto } from './dto';
import { AttractionContent } from './attraction-content.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TagService } from '../tag/tag.service';

@Injectable()
export class AttractionContentService {
  constructor(
    @InjectRepository(AttractionContent)
    private readonly attrRepo: Repository<AttractionContent>,
    private readonly tagService: TagService,
  ) {}

  async deleteOne(id: string) {
    const response = await this.attrRepo.delete(id).catch(() => {
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
        await this.attrRepo.update({ id: value.id }, { ...value, tags });
      }),
    );

    newContents.length ? await this.create(newContents, attraction) : null;
  }

  async create(values: CreateAttractionContentDto[], attraction: string) {
    await Promise.all(
      values.map(async (value) => {
        let tags = []
        if(value.tags.length){
          tags = await this.tagService.getMoreByIds(value.tags);
        }

        await this.attrRepo
          .createQueryBuilder()
          .insert()
          .into(AttractionContent)
          .values({...value,tags,attraction} as unknown as AttractionContent)
          .execute();
      }),
    );
  }
}
