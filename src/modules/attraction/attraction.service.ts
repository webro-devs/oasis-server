import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UpdateAttractionDto, CreateAttractionDto } from './dto';
import { Attraction } from './attraction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AttractionContentService } from '../attraction-content/attraction-content.service';

@Injectable()
export class AttractionService {
  constructor(
    @InjectRepository(Attraction)
    private readonly attractionRepository: Repository<Attraction>,
    private readonly attrContService: AttractionContentService,
  ) {}

  async getAll(langCode:string) {
    const data = await this.attractionRepository.find();
    const ids = data.map(d=>d.id)
    return await this.attrContService.getAll(ids,langCode)
  }

  async getOne(id: string,langCode:string) {
    const data = await this.attrContService.getOne(id,langCode)
    return data;
  }

  async deleteOne(id: string) {
    const response = await this.attractionRepository.delete(id).catch(() => {
      throw new NotFoundException('data not found');
    });
    return response;
  }

  async change(value: UpdateAttractionDto, id: string) {
    const attraction = await this.attractionRepository.findOne({
      where: { id },
    });

    if(value.photo){
      attraction.photo = value.photo
      await this.attractionRepository.save(attraction)
    }

    if(value.contents.length){
      await this.attrContService.change(value.contents, attraction.id);
    }
  }

  async create(value: CreateAttractionDto) {
    const attraction = new Attraction();
    attraction.type = value.type
    attraction.photo = value?.photo || null
    await this.attractionRepository.save(attraction);

    await this.attrContService.create(value.contents, attraction.id);
    return attraction;
  }
}
