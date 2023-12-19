import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UpdateEventDto, CreateEventDto } from './dto';
import { Event} from './event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EventContentService } from '../event-content/event-content.service';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    private readonly eventContService: EventContentService,
  ) {}

  async getAll(langCode:string) {
    const data = await this.eventRepository.find();
    const ids = data.map(d=>d.id)
    return await this.eventContService.getAll(ids,langCode)
  }

  async getOne(id: string,langCode:string) {
    const data = await this.eventContService.getOne(id,langCode)
    return data;
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

    if(value.contents.length){
      await this.eventContService.change(value.contents, event.id);
    }
  }

  async create(value: CreateEventDto) {
    const event = new Event();
    await this.eventRepository.save(event);

    await this.eventContService.create(value.contents, event.id);
    return event;
  }
}
