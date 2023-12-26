import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UpdateTourCategoryDto, CreateTourCategoryDto } from './dto';
import { TourCategory } from './tour-category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PageService } from '../page/page.service';

@Injectable()
export class TourCategoryService {
  constructor(
    @InjectRepository(TourCategory)
    private readonly tourCategoryRepository: Repository<TourCategory>,
    private readonly pageService: PageService,
  ) {}

  async getAll(langCode: string) {
    const data = await this.tourCategoryRepository.find({
      relations: {
        page: true,
      },
    });
    const pageIds = data.map((d) => d.page.id);
   
    return 0;
  }

  async getOne(type: string, langCode: string) {
    const data = await this.tourCategoryRepository
      .findOne({
        where: { type },
        relations: {
          page: true,
        },
      })
      .catch(() => {
        throw new NotFoundException('data not found');
      });

    if (data) {
      const page = await this.pageService.getOne(data.page.id, langCode);

      return { ...data, ...page };
    }
  }

  async getOneByType(type: string) {
    const data = await this.tourCategoryRepository.findOne({
      where: {
        type,
      },
    });
    return data;
  }

  async deleteOne(id: string) {
    const response = await this.tourCategoryRepository.delete(id).catch(() => {
      throw new NotFoundException('data not found');
    });
    return response;
  }

  async change(value: UpdateTourCategoryDto, id: string) {
    const transport = await this.tourCategoryRepository.findOne({
      where: { id },
      relations: {
        page: true,
      },
    });

    if (value?.contents?.length) {
      await this.pageService.change(value, transport.page.id);
    }
  }

  async create(value: CreateTourCategoryDto) {
    const isExist = await this.getOneByType(value.type);

    if (isExist) {
      return new HttpException(`${value.type} already exist`, 400);
    }

    const transport = new TourCategory();
    transport.type = value.type;
    await this.tourCategoryRepository.save(transport);

    await this.pageService.create(
      value,
      { transport, isTopic: false },
      { path: `${value.type}`, short: false },
    );
    return transport;
  }
}
