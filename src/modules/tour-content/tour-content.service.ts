import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CreateTourContentDto, UpdateTourContentDto } from './dto';
import { TourContent } from './tour-content.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Tour } from '../tour/tour.entity';

@Injectable()
export class TourContentService {
  constructor(
    @InjectRepository(TourContent)
    private readonly tourContRepo: Repository<TourContent>,
  ) {}

  async getById(id:string){
    return await this.tourContRepo.findOne({
      where:{id},
      relations:{
        tags:true
      }
    })
  }

  async deleteOne(id: string) {
    const response = await this.tourContRepo.delete(id).catch(() => {
      throw new NotFoundException('data not found');
    });
    return response;
  }

  async change(values: UpdateTourContentDto[] , tour:Tour, type:string) {
    const newContents = values.filter((dc) => !dc.id);
    const olderContents = values.filter((dc) => dc.id);

    await Promise.all(
      olderContents.map(async (value) => {
        await this.updateContent(value.id, value)
      }),
    );

    newContents.length ? await this.create(newContents, tour,type) : null;
  }

  async updateContent(id:string,value: UpdateTourContentDto){
    let data = await this.tourContRepo.findOne({
     where:{id},
     relations:{tags:true}
   })
   await this.tourContRepo.save({...data,...value})
 }

  async create(values: CreateTourContentDto[], tour: Tour,type:string) {
    await Promise.all(
      values.map(async (value) => {
        await this.createContent(value,tour,type)
      }),
    );
  }

  async createContent(value: CreateTourContentDto, tour: Tour, type:string) {
    value[type] = tour
    const data = this.tourContRepo.create({ ...value });
    await this.tourContRepo.save(data);
  }
}
