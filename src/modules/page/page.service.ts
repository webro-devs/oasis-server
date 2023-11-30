import { NotFoundException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UpdatePageDto, CreatePageDto, PageDto } from './dto';
import { Page } from './page.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PageService {
  constructor(
    @InjectRepository(Page)
    private readonly pageRepository: Repository<Page>,
  ) {}

  async getAll() {
    return await this.pageRepository.find();
  }

  async getOne(id: string) {
    const data = await this.pageRepository
      .findOne({
        where: { id },
        relations:{
          pagesOnLeft:true,
          pagesOnRight:true
        }
      })
      .catch(() => {
        throw new NotFoundException('data not found');
      });

    return data;
  }

  async deleteOne(id: string) {
    const response = await this.pageRepository.delete(id).catch(() => {
      throw new NotFoundException('data not found');
    });
    return response;
  }

  async addPageToLeftSide(data:PageDto) {
    const curPage = await this.pageRepository.findOne({
      where: { id: data.currentPage },
      relations: { pagesOnLeft: true },
    });

    const addPage = await this.pageRepository.findOne({
      where: { id: data.addedPage },
    });

    curPage.pagesOnLeft.push(addPage)
    await this.pageRepository.save(curPage)

    return curPage
  }

  async addPageToRightSide(data:PageDto) {
    const curPage = await this.pageRepository.findOne({
      where: { id: data.currentPage },
      relations: { pagesOnRight: true },
    });

    const addPage = await this.pageRepository.findOne({
      where: { id: data.addedPage },
    });

    curPage.pagesOnRight.push(addPage)
    await this.pageRepository.save(curPage)
    
    return curPage
  }

  async change(value: UpdatePageDto, id: string) {
    const data = await this.pageRepository.update(id, value);
    return data;
  }

  async create(value: CreatePageDto) {
    const data = this.pageRepository.create(value);
    return await this.pageRepository.save(data);
  }
}
