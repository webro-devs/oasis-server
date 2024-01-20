import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UpdateEventDto, CreateEventDto } from './dto';
import { Event } from './event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EventContentService } from '../event-content/event-content.service';
import slugify from 'slugify';
import { ConfigService } from '@nestjs/config';
import { TagTagDto } from 'src/infra/shared/dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    private readonly eventContService: EventContentService,
    private readonly configService: ConfigService,
  ) {}

  async getAll(langCode: string) {
    const data = await this.eventRepository.find({
      where:{
        contents:{
          langCode
        }
      },
      order:{
        index:"ASC"
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
        views:true,
        contents:{
          title:true,
          description:true,
          shortTitle:true
        }
      }
    });

    return data
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
    return data;
  }

  async getByUrl(title: string, langCode: string) {
    const url = this.configService.get('clientUrl') + `event/${title}`;
    const data = await this.eventRepository.findOne({
      where:{
        url
      }
    })
    
    if(!data) return {}

    return this.getOne(data.slug, langCode)
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
      return slug + '_';
    }

    return slug;
  }

  async addTag(values: TagTagDto){
    await this.eventContService.addTag(values)
  }

  async removeTag(values: TagTagDto){
    await this.eventContService.removeTag(values)
  }
}
