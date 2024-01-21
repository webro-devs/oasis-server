import { NotFoundException, Injectable } from '@nestjs/common';
import {  Repository } from 'typeorm';

import {  CreatePageContentDto, UpdatePageContentDto } from './dto';
import { PageContent } from './page-content.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Page } from '../page/page.entity';

@Injectable()
export class PageContentService {
  constructor(
    @InjectRepository(PageContent)
    private readonly pageContRepo: Repository<PageContent>
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

  async change(values: UpdatePageContentDto[], page: Page) {
    const newContents = values.filter((pc) => !pc.id);
    const olderContents = values.filter((pc) => pc.id);

    await Promise.all(
      olderContents.map(async (value) => {
        await this.updateContent(value.id, value)
      }),
    );

    newContents.length ? await this.create(newContents, page) : null;
  }

  async updateContent(id:string,value: UpdatePageContentDto){
    let data = await this.pageContRepo.findOne({
     where:{id},
     relations:{tags:true}
   })
   await this.pageContRepo.save({...data,...value})
 }

  async create(values: CreatePageContentDto[], page: Page) {
    await Promise.all(
      values.map(async (value) => {
        await this.createContent(value,page)
      }),
    );
  }

  async createContent(value: CreatePageContentDto, page: Page) {
    const data = this.pageContRepo.create({ ...value, page });

    await this.pageContRepo.save(data);
  }
}
