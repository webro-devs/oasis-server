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
      where:{
        page:{
          contents:{
            langCode
          }
        }
      },
      relations: {
        page: {
          contents:true
        },
      },
      select:{
        id:true,
        type:true,
        page:{
          id:true,
          contents:{
            shortTitle:true,
            description:true,
            langCode:true,
            title:true
          }
        }
      }
    });
   
    return data;
  }

  async getOne(type: string, langCode: string) {
    const data = await this.tourCategoryRepository
      .findOne({
        where:{
          type,
          page:{
            contents:{
              langCode
            }
          }
        },
        relations: {
          page: {
            contents:true
          },
        },
        select:{
          id:true,
          type:true,
          page:{
            id:true,
            contents:{
              shortTitle:true,
              description:true,
              langCode:true,
              title:true
            }
          }
        }
      })
      .catch(() => {
        throw new NotFoundException('data not found');
      });

    return data
  }

  async getOneByType(type: string) {
    const data = await this.tourCategoryRepository.findOne({
      where: {
        type,
      },
    })

    if(!data) return {}

    return data;
  }

  async deleteOne(id: string) {
    const response = await this.tourCategoryRepository.delete(id).catch(() => {
      throw new NotFoundException('data not found');
    });
    return response;
  }

  async change(value: UpdateTourCategoryDto, id: string) {
    const tourCategory = await this.tourCategoryRepository.findOne({
      where: { id },
      relations: {
        page: true,
      },
    });

    if (value?.contents?.length) {
      await this.pageService.change(value, tourCategory.page.id);
    }
  }

  async create(value: CreateTourCategoryDto) {
    const isExist = await this.getOneByType(value.type);

    if (isExist) {
      return new HttpException(`${value.type} already exist`, 400);
    }

    const tourCategory = new TourCategory();
    tourCategory.type = value.type;
    await this.tourCategoryRepository.save(tourCategory);

    await this.pageService.create(
      value,
      { tourCategory, isTopic: false },
      { path: `tour-category/${value.type}`, short: false },
    );
    return tourCategory;
  }
}
