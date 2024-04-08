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

  async getAll(destination:string,langCode: string) {
    const data = await this.tourCategoryRepository.find({
      where: {
        page: {
          contents: {
            langCode,
          },
        },
        destination:{
          slug: destination
        }
      },
      order: {
        order: 'ASC',
      },
      relations: {
        page: {
          contents: true,
        },
        destination:true
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
        destination:{
          id:true,
          slug:true
        }
      },
    });
    const res = [];

    data.forEach((d) => {
      res.push({
        slug: d.slug,
        photo: d.photo,
        title: d.page.contents[0].title,
        shortTitle: d.page.contents[0].shortTitle,
        destinationSlug: d?.destination?.slug
      });
    });

    return res;
  }

  async getAllForAdmin(destination:string,langCode: string,options: IPaginationOptions) {
    const data = await paginate<TourCategory>(this.tourCategoryRepository,options,{
      where: {
        page: {
          contents: {
            langCode,
          },
        },
        destination:{
          slug: destination
        }
      },
      relations: {
        page: {
          contents: true,
        },
        tours: true,
        destination:true
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
        },
        destination:{
          id:true,
          slug:true
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
        tours: d.tours,
        destinationSlug: d?.destination?.slug
      })
    })

    return {...data,items:res};
  }

  async getOne(destination:string,slug: string, langCode: string) {
    const data = await this.tourCategoryRepository
      .findOne({
        where: {
          slug,
          page: {
            contents: {
              langCode,
            },
          },
          destination:{
            slug:destination
          }
        },
        relations: {
          page: {
            contents: {
              tags: true,
            },
          },
          destination:true,
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
      descriptionPage: data.page.contents[0]?.descriptionPage,
      tours,
      destinationSlug: data?.destination?.slug
     };

    return res;
  }

  async getLeftSide(destination:string,langCode: string) {
    const data = await this.tourCategoryRepository.find({
      where: {
        page: {
          contents: {
            langCode,
          },
        },
        destination:{
          slug: destination
        }
      },
      relations: {
        tours: true,
        page: {
          contents: true,
        },
        destination:true
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
        destinationSlug: d?.destination?.slug
      });
    });

    return res;
  }

  async getContent(destination:string,langCode: string, options: IPaginationOptions) {
    const data = await paginate<TourCategory>(
      this.tourCategoryRepository,
      options,
      {
        where:{
          destination:{
            slug:destination
          },
          page:{
            contents:{
              langCode
            }
          }
        },
        relations: {
          tours: {
            about: true,
            itinerary: true,
            name:true
          },
          page:{
            contents:true
          },
          destination:true
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
          },
          destination:{
            id:true,
            slug:true
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
      
      const title = d?.page?.contents[0]?.title
      
      res.push({
        slug: d?.slug,
        title,
        tours,
        destinationSlug: d?.destination?.slug
      })
    });

    return {...data,items:res}
  }

  async getOneForUpdate(destination:string,id: string, langCode: string) {
    const data = await this.tourCategoryRepository.findOne({
      where: {
        id,
        page: {
          contents: {
            langCode,
          },
        },
        destination:{
          slug:destination
        }
      },
      relations: {
        page: {
          contents: {
            tags: true,
          },
        },
        destination:true
      },
    });

    return {...data.page.contents[0],photo: data.photo, destinationSlug: data?.destination?.slug}
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

    if(value?.photo){
      tourCategory.photo = value?.photo ? value.photo : tourCategory.photo
      tourCategory.descImages = value?.descImages ? value.descImages : tourCategory.descImages
      this.tourCategoryRepository.save(tourCategory)
    }

    if (value?.contents?.length) {
      await this.pageService.change(value, tourCategory.page.id);
    }
  }

  async create(value: CreateTourCategoryDto) {
    const shortTitle = value.contents.find((c) => c.langCode == 'en')?.shortTitle;
    if (!shortTitle) {
      throw new HttpException('short title in english should be exist', 400);
    }

    const tourCategory = await this.createTourCategory({
      photo:value.photo,
      descImages: value.descImages || [],
      slug: await this.makeSlug(shortTitle),
      url:  await this.makeUrl('tour-category/', shortTitle)
    })

    await this.pageService.create(
      value,
      { tourCategory, isTopic: false },
      { path: `tour-category/${shortTitle}`, short: false },
    );
    return tourCategory;
  }

  async createTourCategory(value) {
    const data = await this.tourCategoryRepository
      .createQueryBuilder()
      .insert()
      .into(TourCategory)
      .values( value as unknown as TourCategory)
      .returning('id')
      .execute();

    return await this.tourCategoryRepository.findOne({ where: { id: data.raw[0].id } });
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
