import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import {
  IPaginationOptions,
  paginate,
} from 'nestjs-typeorm-paginate';

import { UpdateTourDto, CreateTourDto } from './dto';
import { Tour } from './tour.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TourContentService } from '../tour-content/tour-content.service';
import { ConfigService } from '@nestjs/config';
import slugify from 'slugify';
import { TourPriceService } from '../tour-price/tour-price.service';
import { TourItineraryService } from '../tour-itinerary/tour-itinerary.service';

@Injectable()
export class TourService {
  constructor(
    @InjectRepository(Tour)
    private readonly tourRepository: Repository<Tour>,
    private readonly tourContService: TourContentService,
    private readonly configService: ConfigService,
    private readonly tourPriceService: TourPriceService,
    private readonly tourItineraryService: TourItineraryService
  ) {}

  async getOne(slug: string, langCode:string) {
    const data = await this.tourRepository
      .findOne({
        where: {
           slug,
           name:{
            langCode
           }
        },
        relations:{
          name:true,
          routes:true,
          price:true
        }
      })
      .catch(() => {
        throw new NotFoundException('data not found');
    });

    if(!data) return {}

    const res = {
      price: data?.tourPrice,
      photoGallery: data?.photoGallery,
      photo: data.photo,
      name: data?.name[0] || '',
      slug: data?.slug,
      paxPrice: data?.price,
      routes: data?.routes
    }

    return res;
  }

  async getAllForSite(options: IPaginationOptions ,langCode:string, where:any = {}){
    where.name = {
      langCode
    }
    const data = await paginate<Tour>(this.tourRepository, options, {
      where,
      relations:{
        name:true
      },
      select:{
        id:true,
        photo:true,
        tourPrice:true,
        slug:true,
        name:{
          id:true,
          title:true
        }
      }
    })
 
    const res = []
    data?.items?.forEach(d=>{
      const title = d?.name?.find(n=> n.langCode == langCode)?.title
      res.push({
        slug: d.slug,
        photo: d.photo,
        title,
        price: d.tourPrice
      })
    })
    
    return res
  }

  async getOneFields(slug:string,langCode:string,type:string){
    const relations = {}
    relations[type] = true
    const data = await this.tourRepository.findOne({
      where:{
        slug
      },
      relations
    })

    if(!data) return {}

    const res = data?.[type]?.find(d=> d.langCode == langCode) || {}

    return res
  }

  async getAllForAdmin(options: IPaginationOptions , langCode:string,id:string){
    const data = await paginate<Tour>(this.tourRepository, options, {
      where:{
        tourCategory:{
          id
        },
        name:{
          langCode
        }
      },
      relations:{
        name:true,
        itinerary:true
      },
      select:{
        id:true,
        slug:true,
        date:true,
        index:true,
        url:true,
        views:true,
        tourPrice:true,
        name:{
          id:true,
          title:true,
          langCode:true
        },
        itinerary:{
          id:true
        }
      },
      order:{
        date:"DESC"
      }
    })

    const res = []
    data.items.forEach(d=>{
      res.push({
        id:d.id,
        slug: d.slug,
        url: d.url,
        views: d.views,
        title: d.name[0]?.title,
        days: d.itinerary.length,
        price: d.tourPrice
      })
    })

    return res
  }

  async deleteOne(id: string) {
    const response = await this.tourRepository.delete(id).catch(() => {
      throw new NotFoundException('data not found');
    });
    return response;
  }

  async change(value: UpdateTourDto, id: string) {
    const tour = await this.tourRepository.findOne({
      where: { id },
    });

    if (value?.photoGallery?.length) {
      tour.photoGallery = value.photoGallery
    }

    if (value?.about?.length) {
      await this.tourContService.change(value.about, tour,'tourAbout');
    }

    if (value?.book?.length) {
      await this.tourContService.change(value.book, tour,'tourBook');
    }

    if (value?.specification?.length) {
      await this.tourContService.change(value.specification, tour,'tourSpecification');
    }

    if (value?.price?.length) {
      await this.tourPriceService.change(value.price, tour.id);
    }

    await this.tourRepository.save(tour)
  }

  async create(value: CreateTourDto) {
    const title = value.name.find((c) => c.langCode == 'en')?.title;

    if (!title) {
      throw new HttpException('title in english should be exist in about', 400);
    }

    const url = await this.makeUrl('tour/', title);
    const slug = await this.makeSlug(title);

    const tour = await this.createTour({
      url,
      tourCategory: value.tourCategory,
      photoGallery: value?.photoGallery || [],
      destination: value?.destination,
      photo: value?.photo || null,
      tourPrice: value.price[0].econome,
      slug
    });

    if (value?.about?.length) {
      await this.tourContService.create(value.about, tour,'tourAbout');
    }

    if (value?.name?.length) {
      await this.tourContService.create(value.name, tour,'tourName');
    }

    if (value?.book?.length) {
      await this.tourContService.create(value.book, tour,'tourBook');
    }

    if (value?.itinerary?.length) {
      await this.tourItineraryService.create(value.itinerary, tour)
    }

    if (value?.specification?.length) {
      await this.tourContService.create(value.specification, tour,'tourSpecification');
    }

    if (value?.price?.length) {
      await this.tourPriceService.create(value.price, tour.id);
    }

    tour.routes = value.routes

    return await this.tourRepository.save(tour);
  }

  async createTour(value) {
    const data = await this.tourRepository
      .createQueryBuilder()
      .insert()
      .into(Tour)
      .values( value as unknown as Tour)
      .returning('id')
      .execute();

    return await this.tourRepository.findOne({ where: { id: data.raw[0].id } });
  }

  async makeUrl(path: string, title: string) {
    const url =
      this.configService.get('clientUrl') +
      path +
      slugify(title, { lower: true });

    const isExist = await this.tourRepository.findOne({
      where: { url },
    });

    if (isExist) {
      return url + '_';
    }

    return url;
  }

  async makeSlug(title: string) {
    const slug = slugify(title, { lower: true });

    const isExist = await this.tourRepository.findOne({
      where: { slug },
    });

    if (isExist) {
      return await this.makeSlug(slug + '_');
    }

    return slug;
  }
}
