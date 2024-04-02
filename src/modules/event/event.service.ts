import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import {
  IPaginationOptions,
  paginate,
} from 'nestjs-typeorm-paginate';

import { UpdateEventDto, CreateEventDto } from './dto';
import { Event } from './event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EventContentService } from '../event-content/event-content.service';
import slugify from 'slugify';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    private readonly eventContService: EventContentService,
    private readonly configService: ConfigService,
  ) {}

  async getAll(langCode: string,options: IPaginationOptions) {
    const data = await paginate<Event>(this.eventRepository, options, {
      where:{
        contents:{
          langCode
        }
      },
      relations:{
        contents:true
      },
      select:{
        id:true,
        url:true,
        date: true,
        photo:true,
        slug:true,
        contents:{
          title:true,
          description:true,
        }
      }
    });
    const res = []
    data.items.forEach(d=>{
      res.push({
        id: d.id,
        slug: d.slug,
        date: d.date,
        photo: d.photo,
        title: d.contents[0].title,
        description: d.contents[0].description,
      })
    })

    return {...data,items:res}
  }

  async getAllForAdmin(langCode: string,options: IPaginationOptions) {
    const data = await paginate<Event>(this.eventRepository, options, {
      where:{
        contents:{
          langCode
        }
      },
      relations:{
        contents:true
      },
      select:{
        id:true,
        url:true,
        date: true,
        slug:true,
        views:true,
        contents:{
          title:true,
        }
      }
    });
    const res = []
    data.items.forEach(d=>{
      res.push({
        id: d.id,
        slug: d.slug,
        date: d.date,
        title: d.contents[0].title,
        url: d.url,
        views: d.views
      })
    })

    return {...data,items:res}
  }

  async getOne(slug: string, langCode: string) {
    const data = await this.eventRepository.findOne({
      where:{
        slug,
        contents:{
          langCode
        }
      },
      relations:{
        contents:{
          tags:true
        }
      }
    });

    const res = {
      slug: data.slug,
      date: data.date,
      photo: data.photo,
      description: data?.contents[0]?.description,
      title: data?.contents[0]?.title
    }
    
    return res
  }

  async getOneForUpdate(id:string,langCode:string){
    const data = await this.eventRepository.findOne({
      where:{
        id,
        contents:{
          langCode
        }
      },
      relations:{
        contents:{
          tags:true
        }
      }
    })

    return {...data.contents[0], photo: data.photo}
  }

  async deleteOne(id: string) {
    const response = await this.eventRepository.delete(id).catch(() => {
      throw new NotFoundException('data not found');
    });
    return response;
  }

  async change(value: UpdateEventDto, id: string) {
    const event = await this.eventRepository.findOne({
      where: { id },
    });

    if(value?.photo || value?.descImages){
      event.photo = value?.photo ? value.photo : event.photo
      event.descImages = value?.descImages ? value.descImages : event.descImages
      this.eventRepository.save(event)
    }

    if (value.contents.length) {
      await this.eventContService.change(value.contents, event);
    }
  }

  async create(value: CreateEventDto) {
    const title = value.contents.find((c) => c.langCode == 'en')?.title;

    if (!title) {
      throw new HttpException('short title in english should be exist', 400);
    }
    const url = await this.makeUrl('event/', title);

    const event = new Event();
    event.url = url;
    event.photo = value.photo
    event.descImages = value.descImages || []
    event.slug = await this.makeSlug(title)
    await this.eventRepository.save(event);

    await this.eventContService.create(value.contents, event);
    return event;
  }

  async makeUrl(path: string, shortTitle: string) {
    const url =
      this.configService.get('clientUrl') +
      path +
      slugify(shortTitle, { lower: true });

    const isExist = await this.eventRepository.findOne({
      where: { url },
    });

    if (isExist) {
      return url + '_';
    }

    return url;
  }

  async makeSlug(title: string) {
    const slug = slugify(title, { lower: true });

    const isExist = await this.eventRepository.findOne({
      where: { slug },
    });

    if (isExist) {
      return await this.makeSlug(slug + '_')
    }

    return slug;
  }
}
