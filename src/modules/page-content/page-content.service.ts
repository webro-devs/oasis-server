import { NotFoundException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UpdatePageContentDto, CreatePageContentDto } from './dto';
import { PageContent } from './page-content.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PageContentService {
  constructor(
    @InjectRepository(PageContent)
    private readonly pageContentRepository: Repository<PageContent>,
  ) {}

  async getAll() {
    return await this.pageContentRepository.find();
  }

  async getOne(id: string) {
    const data = await this.pageContentRepository
      .findOne({
        where: { id },
      })
      .catch(() => {
        throw new NotFoundException('data not found');
      });

    return data;
  }

  async deleteOne(id: string) {
    const response = await this.pageContentRepository.delete(id).catch(() => {
      throw new NotFoundException('data not found');
    });
    return response;
  }

  async change(value: UpdatePageContentDto, id: string) {
    const data = await this.pageContentRepository.update(id, value);
    return data;
  }

  async create(value: CreatePageContentDto) {
    const data = this.pageContentRepository.create(value);
    return await this.pageContentRepository.save(data);
  }
}
