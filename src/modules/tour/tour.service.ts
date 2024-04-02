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
import { TourRouteService } from '../tour-route/tour-route.service';

@Injectable()
export class TourService {
  constructor(
    @InjectRepository(Tour)
    private readonly tourRepository: Repository<Tour>,
    private readonly tourContService: TourContentService,
    private readonly configService: ConfigService,
    private readonly tourPriceService: TourPriceService,
    private readonly tourItineraryService: TourItineraryService,
    private readonly tourRouteService: TourRouteService
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
          price:true,
          itinerary:true
        },
        select:{
          id:true,
          slug:true,
          photo:true,
          photoGallery:true,
          tourPrice:true,
          name:{
            title:true,
            langCode:true
          },
          routes:{
            title:true
          },
          itinerary:{
            id:true
          }
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
      title: data?.name[0]?.title || '',
      slug: data?.slug,
      paxPrice: data?.price,
      routes: data?.routes,
      day: data.itinerary.length
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
          title:true,
          langCode:true
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

    if(type == 'price') return await this.getPriceField(slug,langCode,relations)

    if(type == 'itinerary') return await this.getItineraryField(slug,langCode,{})

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

  async getPriceField(slug:string,langCode:string,relations){
    const data = await this.tourRepository.findOne({
      where:{
        slug
      },
      relations
    })


    if(!data) return {}

    const res = []

    data?.price?.forEach(p=>{
      const person = p?.person?.find(p=>p.langCode == langCode)?.person
      res.push({
        person,
        comfort: p.comfort,
        deluxe: p.deluxe,
        econome: p.econome
      })
    })

    return res
  }

  async getItineraryField(slug:string,langCode:string,relations){
    relations = {
      itinerary : {
         contents: true
      }
    }
    const data = await this.tourRepository.findOne({
      where:{
        slug
      },
      relations
    })


    if(!data) return {}

    const res = []

    data?.itinerary?.forEach(it=>{
       const day = it?.contents?.find(c=> c.langCode == langCode)
       res.push(day)
    })

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

  async getAllForUpdate(id:string, langCode:string){
    const data = await this.tourRepository.findOne({
      where:{
        id
      },
      relations:{
        name:true,
        itinerary:true,
        about:true,
        book:true,
        destination:true,
        price:true,
        routes:true,
        specification:true,
        tourCategory:true,
      },
    })
    const res:any = {}
    for( let i = 0; i < data.name.length; i++){
      if(data.name[i]?.langCode == langCode){
        res.name = data.name[i]
      }
      if(data.about[i]?.langCode == langCode){
        res.about = data.about[i]
      }
      if(data.book[i].langCode == langCode){
        res.book = data.book[i]
      }
      if(data.specification[i].langCode == langCode){
        res.specification = data.specification[i]
      }
    }
    if(data.price.length){
      res.price = data.price.map(p=>{
        const person = p?.person?.find(p=> p.langCode == langCode)
        return {...p,person}
      })
    }
    if(data.itinerary.length){
      res.itinerary = data.itinerary.map(i=>{
        return i.contents?.find(c => c?.langCode == langCode)
      })
    }

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

    if (value?.tour) {
      tour.photoGallery = value?.tour?.photoGallery ? value?.tour?.photoGallery : tour.photoGallery
      tour.photo = value?.tour?.photo ? value?.tour?.photo : tour.photo
      tour.descImages = value?.tour?.descImages ? value?.tour?.descImages : tour.descImages
      if(value.tour?.routes){
        tour.routes = await this.tourRouteService.getMoreByTitels(value.tour.routes)
      }
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
      slug,
      descImages: value?.descImages || []
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

    tour.routes = await this.tourRouteService.getMoreByTitels(value.routes)

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
