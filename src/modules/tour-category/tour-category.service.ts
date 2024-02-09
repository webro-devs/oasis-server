import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

import { UpdateTourCategoryDto, CreateTourCategoryDto } from './dto';
import { TourCategory } from './tour-category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PageService } from '../page/page.service';
import { ConfigService } from '@nestjs/config';
import slugify from 'slugify';

@Injectable()
export class TourCategoryService {
  constructor(
    @InjectRepository(TourCategory)
    private readonly tourCategoryRepository: Repository<TourCategory>,
    private readonly pageService: PageService,
    private readonly configService: ConfigService,
  ) {}

  async getAll(langCode: string) {
    const data = await this.tourCategoryRepository.find({
      where: {
        page: {
          contents: {
            langCode,
          },
        },
      },
      order: {
        index: 'ASC',
      },
      relations: {
        page: {
          contents: true,
        },
      },
      select: {
        id: true,
        type: true,
        photo: true,
        url: true,
        views: true,
        page: {
          id: true,
          contents: {
            shortTitle: true,
            title: true,
          },
        },
      },
    });
    const res = [];

    data.forEach((d) => {
      res.push({
        slug: d.type,
        photo: d.photo,
        title: d.page.contents[0].title,
        shortTitle: d.page.contents[0].shortTitle,
      });
    });

    return res;
  }

  async getAllForAdmin(langCode: string,options: IPaginationOptions) {
    const data = await paginate<TourCategory>(this.tourCategoryRepository,options,{
      where: {
        page: {
          contents: {
            langCode,
          },
        },
      },
      order: {
        index: 'ASC',
      },
      relations: {
        page: {
          contents: true,
        },
        tours: true,
      },
      select: {
        id: true,
        type: true,
        photo: true,
        url: true,
        views: true,
        page: {
          id: true,
          contents: {
            id:true,
            shortTitle: true,
            title: true,
          },
        },
        tours:{
          id:true
        }
      },
    });

    const res = []

    data.items.forEach(d=>{
      res.push({
        id: d.id,
        slug: d.type,
        photo: d.photo,
        shortTitle: d.page.contents[0].shortTitle,
        title: d.page.contents[0].title,
        views: d.views,
        url: d.url
      })
    })

    return {...data,items:res};
  }

  async getAllForTourPage(langCode: string) {
    const data = await this.tourCategoryRepository.find({
      where: {
        page: {
          contents: {
            langCode,
          },
        },
      },
      order: {
        index: 'ASC',
      },
      relations: {
        page: {
          contents: true,
        },
        tours: {
          about: true,
        },
      },
      select: {
        id: true,
        type: true,
        photo: true,
        page: {
          id: true,
          contents: {
            shortTitle: true,
            description: true,
            langCode: true,
            title: true,
          },
        },
      },
    });

    const res = [];

    data.forEach((d) => {
      res.push({
        slug: d.type,
        photo: d.photo,
        contents: d.page.contents[0],
      });
    });

    return data;
  }

  async getOne(type: string, langCode: string) {
    const data = await this.tourCategoryRepository
      .findOne({
        where: {
          type,
          page: {
            contents: {
              langCode,
            },
          },
        },
        relations: {
          page: {
            contents: {
              tags: true,
            },
          },
          tours: {
            about: true,
          },
        },
        select: {
          id: true,
          type: true,
          photo: true,
          url: true,
          views: true,
          page: {
            id: true,
            contents: {
              shortTitle: true,
              description: true,
              langCode: true,
              title: true,
            },
          },
        },
      })
      .catch(() => {
        throw new NotFoundException('data not found');
      });

    const page = { ...data.page, contents: data.page.contents };

    return { ...data, page };
  }

  async getOneByType(type: string) {
    const data = await this.tourCategoryRepository.findOne({
      where: {
        type,
      },
    });

    return data;
  }

  async getLeftSide(langCode: string) {
    const data = await this.tourCategoryRepository.find({
      where: {
        page: {
          contents: {
            langCode,
          },
        },
      },
      relations: {
        tours: true,
        page: {
          contents: true,
        },
      },
      select: {
        id: true,
        type: true,
        page: {
          id: true,
          contents: {
            id: true,
            shortTitle: true,
          },
        },
        tours: {
          id: true,
        },
      },
    });

    if (!data.length) return [];

    const res = [];
    data.forEach((d) => {
      res.push({
        slug: d.type,
        title: d.page.contents[0].shortTitle,
        tourCount: d.tours.length,
      });
    });

    return res;
  }

  async getContent(langCode: string, options: IPaginationOptions) {
    const data = await paginate<TourCategory>(
      this.tourCategoryRepository,
      options,
      {
        relations: {
          tours: {
            about: true,
            itinerary: true,
          },
          page:{
            contents:true
          }
        },
        select: {
          id: true,
          type: true,
          photo: true,
          tours: {
            id: true,
            slug: true,
            tourPrice: true,
            about: {
              id: true,
              title: true,
              description: true,
            },
            itinerary: {
              id: true,
            },
          },
          page:{
            id:true,
            contents:{
              id:true,
              title:true
            }
          }
        },
      },
    );

    if (!data.items.length) return [];

    const res = [];

    data?.items.forEach((d) => {
      const tours = [];
      d.tours.forEach((t) => {
        const about = t.about.find((n) => n.langCode == langCode);
        const day = t?.itinerary?.length || 0;
        tours.push({
          title: about?.title,
          description: about?.description,
          slug: t?.slug,
          price: t?.tourPrice,
          day: day,
          night: day > 0 ? day - 1 : 0,
        });
      });

      const title = d?.page?.contents?.find(c=>c.langCode == langCode)?.title
      res.push({
        slug: d?.type,
        title,
        tours
      })
    });

    return {...data,items:res}
  }

  async getOneForUpdate(id: string, langCode: string) {
    const data = await this.tourCategoryRepository.findOne({
      where: {
        id,
        page: {
          contents: {
            langCode,
          },
        },
      },
      relations: {
        page: {
          contents: {
            tags: true,
          },
        },
      },
    });

    return data.page.contents[0];
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
    tourCategory.type = slugify(value.type);
    tourCategory.photo = value.photo;
    tourCategory.url = await this.makeUrl('tour-category/', value.type);
    await this.tourCategoryRepository.save(tourCategory);

    await this.pageService.create(
      value,
      { tourCategory, isTopic: false },
      { path: `tour-category/${value.type}`, short: false },
    );
    return tourCategory;
  }

  async makeUrl(path: string, title: string) {
    const url =
      this.configService.get('clientUrl') +
      path +
      slugify(title, { lower: true });

    const isExist = await this.tourCategoryRepository.findOne({
      where: { url },
    });

    if (isExist) {
      return url + '_';
    }

    return url;
  }
}
