import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CreateAttractionContentDto, UpdateAttractionContentDto } from './dto';
import { AttractionContent } from './attraction-content.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Attraction } from '../attraction/attraction.entity';

@Injectable()
export class AttractionContentService {
  constructor(
    @InjectRepository(AttractionContent)
    private readonly attrRepo: Repository<AttractionContent>,
  ) {}

  async getById(id:string){
    return await this.attrRepo.findOne({
      where:{id},
      relations:{
        tags:true
      }
    })
  }

  async deleteOne(id: string) {
    const response = await this.attrRepo.delete(id).catch(() => {
      throw new NotFoundException('data not found');
    });
    return response;
  }

  async change(values:UpdateAttractionContentDto[], attraction: Attraction) {
    const newContents = values.filter((dc) => !dc.id);
    const olderContents = values.filter((dc) => dc.id);

    await Promise.all(
      olderContents.map(async (value) => {
        await this.updateContent(value.id, value)
      }),
    );

    newContents.length ? await this.create(newContents, attraction) : null;
  }

  async updateContent(id:string,value: UpdateAttractionContentDto){
     let data = await this.attrRepo.findOne({
      where:{id},
      relations:{tags:true}
    })
    await this.attrRepo.save({...data,...value})
  }

  async create(values: CreateAttractionContentDto[], attraction: Attraction) {
    await Promise.all(
      values.map(async (value) => {
       await this.createContent(value,attraction)
      }),
    );
  }

  async createContent(value: CreateAttractionContentDto, attraction: Attraction) {
    const data = this.attrRepo.create({ ...value, attraction });
    await this.attrRepo.save(data);
  }
}
