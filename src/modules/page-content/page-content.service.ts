import { NotFoundException, Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';

import { UpdatePageContentDto, CreatePageContentDto } from './dto';
import { PageContent } from './page-content.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TagService } from '../tag/tag.service';

@Injectable()
export class PageContentService {
  constructor(
    @InjectRepository(PageContent)
    private readonly pageContRepo: Repository<PageContent>,
    private readonly tagService: TagService,
  ) {}

  async deleteOne(id: string) {
    const response = await this.pageContRepo.delete(id).catch(() => {
      throw new NotFoundException('data not found');
    });
    return response;
  }

  async change(values: UpdatePageContentDto[], page: string) {
    const newContents = values.filter((pc) => !pc.id);
    const olderContents = values.filter((pc) => pc.id);

    await Promise.all(
      olderContents.map(async (value) => {
        const tags = await this.tagService.getMoreByIds(value.tags);
        await this.pageContRepo.update({ id: value.id }, { ...value, tags });
      }),
    );

    newContents.length ? await this.create(newContents, page) : null;
  }

  async create(values: CreatePageContentDto[], page: string) {
    await Promise.all(
      values.map(async (value) => {
        let tags = []
        
        if(value?.tags?.length){
          tags = await this.tagService.getMoreByIds(value.tags);
        }

        await this.pageContRepo
        .createQueryBuilder()
        .insert()
        .into(PageContent)
        .values({...value,page,tags} as unknown as PageContent)
        .execute()
      }),
    );
  }
}
