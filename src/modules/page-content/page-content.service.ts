import { NotFoundException, Injectable } from '@nestjs/common';
import {  Repository } from 'typeorm';

import {  CreatePageContentDto } from './dto';
import { PageContent } from './page-content.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TagService } from '../tag/tag.service';
import { Page } from '../page/page.entity';
import { TagTagDto } from 'src/infra/shared/dto';

@Injectable()
export class PageContentService {
  constructor(
    @InjectRepository(PageContent)
    private readonly pageContRepo: Repository<PageContent>,
    private readonly tagService: TagService,
  ) {}
  async getById(id:string){
    return await this.pageContRepo.findOne({
      where:{id},
      relations:{
        tags:true
      }
    })
  }

  async deleteOne(id: string) {
    const response = await this.pageContRepo.delete(id).catch(() => {
      throw new NotFoundException('data not found');
    });
    return response;
  }

  async change(values, page: Page) {
    const newContents = values.filter((pc) => !pc.id);
    const olderContents = values.filter((pc) => pc.id);

    await Promise.all(
      olderContents.map(async (value) => {
        delete value.tags
        await this.pageContRepo.update({ id: value.id }, { ...value });
      }),
    );

    newContents.length ? await this.create(newContents, page) : null;
  }

  async create(values: CreatePageContentDto[], page: Page) {
    await Promise.all(
      values.map(async (value) => {
        await this.createContent(value,page)
      }),
    );
  }

  async createContent(value: CreatePageContentDto, page: Page) {
    let tags = [];

    if (value.tags.length) {
      tags = await this.tagService.getMoreByIds(value.tags);
    }

    const data = this.pageContRepo.create({ ...value, page, tags });

    await this.pageContRepo.save(data);
  }

  async addTag(values: TagTagDto) {
    const data = await this.getById(values.id);
    const tag = await this.tagService.getOne(values.tagId);
    data.tags.push(tag);

    await this.pageContRepo.save(data);

    return data;
  }

  async removeTag(values: TagTagDto) {
    const data = await this.getById(values.id);

    data.tags = data.tags.length
      ? data.tags.filter((t) => t.id != values.tagId)
      : [];

    await this.pageContRepo.save(data);

    return data;
  }
}
