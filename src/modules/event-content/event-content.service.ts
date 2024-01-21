import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import {  CreateEventContentDto, UpdateEventContentDto } from './dto';
import { EventContent } from './event-content.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from '../event/event.entity';

@Injectable()
export class EventContentService {
  constructor(
    @InjectRepository(EventContent)
    private readonly eventContRepo: Repository<EventContent>,
  ) {}

  async getById(id:string){
    return await this.eventContRepo.findOne({
      where:{id},
      relations:{
        tags:true
      }
    })
  }

  async deleteOne(id: string) {
    const response = await this.eventContRepo.delete(id).catch(() => {
      throw new NotFoundException('data not found');
    });
    return response;
  }

  async change(values: UpdateEventContentDto[], event: Event) {
    const newContents = values.filter((dc) => !dc.id);
    const olderContents = values.filter((dc) => dc.id);

    await Promise.all(
      olderContents.map(async (value) => {
        await this.updateContent(value.id,value)
      }),
    );

    newContents.length ? await this.create(newContents, event) : null;
    }

    async updateContent(id:string,value: UpdateEventContentDto){
      let data = await this.eventContRepo.findOne({
       where:{id},
       relations:{tags:true}
     })
     await this.eventContRepo.save({...data,...value})
   }

  async create(values: CreateEventContentDto[], event: Event) {
    await Promise.all(
      values.map(async (value) => {
        await this.createContent(value, event);
      }),
    );
  }

  async createContent(value: CreateEventContentDto, event: Event) {
    const data = this.eventContRepo.create({ ...value, event });

    await this.eventContRepo.save(data);
  }
}
