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
        order: 'ASC',
      },
      relations: {
        page: {
          contents: true,
        },
      },
      select: {
        id: true,
        slug: true,
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
        slug: d.slug,
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
      relations: {
        page: {
          contents: true,
        },
        tours: true,
      },
      select: {
        id: true,
        slug: true,
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
        slug: d.slug,
        photo: d.photo,
        shortTitle: d.page.contents[0].shortTitle,
        title: d.page.contents[0].title,
        views: d.views,
        url: d.url,
        tours: d.tours
      })
    })

    return {...data,items:res};
  }

  async getOne(slug: string, langCode: string) {
    const data = await this.tourCategoryRepository
      .findOne({
        where: {
          slug,
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
            itinerary: true,
            name:true
          },
        },
        select: {
          id: true,
          slug: true,
          photo: true,
          tours: {
            id: true,
            slug: true,
            tourPrice: true,
            photo:true,
            about: {
              id: true,
              description: true,
              langCode:true
            },
            name: {
              id: true,
              title: true,
              langCode:true
            },
            itinerary: {
              id: true,
            },
          },
          page:{
            id:true,
            contents:{
              id:true,
              title:true,
              descriptionPage:true,
              langCode:true
            }
          }
        },
      })
      .catch(() => {
        throw new NotFoundException('data not found');
      });

      const tours = [];
      data.tours.forEach((t) => {
        const about = t.about.find((n) => n.langCode == langCode);
        const title = t.name.find((n) => n.langCode == langCode)?.title;
        const day = t?.itinerary?.length || 0;
        tours.push({
          title,
          description: about?.description,
          slug: t?.slug,
          price: t?.tourPrice,
          day: day,
          night: day > 0 ? day - 1 : 0,
          photo: t.photo
        });
      });

    const res = { 
      slug: data.slug,
      title: data.page.contents[0]?.title,
      description: data.page.contents[0]?.descriptionPage,
      tours
     };

    return res;
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
        slug: true,
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
        slug: d.slug,
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
            name:true
          },
          page:{
            contents:true
          }
        },
        select: {
          id: true,
          slug: true,
          photo: true,
          tours: {
            id: true,
            slug: true,
            tourPrice: true,
            photo:true,
            about: {
              id: true,
              description: true,
              langCode:true
            },
            name: {
              id: true,
              title: true,
              langCode:true
            },
            itinerary: {
              id: true,
            },
          },
          page:{
            id:true,
            contents:{
              id:true,
              title:true,
              langCode:true
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
        const title = t.name.find((n) => n.langCode == langCode)?.title;
        const day = t?.itinerary?.length || 0;
        tours.push({
          title,
          description: about?.description,
          slug: t?.slug,
          price: t?.tourPrice,
          day: day,
          night: day > 0 ? day - 1 : 0,
          photo: t.photo
        });
      });
      
      const title = d?.page?.contents?.find(c=>c.langCode == langCode)?.title
      
      res.push({
        slug: d?.slug,
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
    const title = value.contents.find((c) => c.langCode == 'en')?.title;
    if (!title) {
      throw new HttpException('title in english should be exist', 400);
    }

    const tourCategory = new TourCategory();
    tourCategory.photo = value.photo;
    tourCategory.slug = await this.makeSlug(title)
    tourCategory.url = await this.makeUrl('tour-category/', title);
    await this.tourCategoryRepository.save(tourCategory);

    await this.pageService.create(
      value,
      { tourCategory, isTopic: false },
      { path: `tour-category/${title}`, short: false },
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

  async makeSlug(title: string) {
    const slug = slugify(title, { lower: true });

    const isExist = await this.tourCategoryRepository.findOne({
      where: { slug },
    });

    if (isExist) {
      return await this.makeSlug(slug + '_');
    }

    return slug;
  }
}
