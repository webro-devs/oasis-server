import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UpdateAttractionDto, CreateAttractionDto } from './dto';
import { Attraction } from './attraction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AttractionContentService } from '../attraction-content/attraction-content.service';
import { TagTagDto } from 'src/infra/shared/dto';

@Injectable()
export class AttractionService {
  constructor(
    @InjectRepository(Attraction)
    private readonly attractionRepository: Repository<Attraction>,
    private readonly attrContService: AttractionContentService,
  ) {}

  async getAll(langCode:string,type) {
    const data = await this.attractionRepository.find({
      where:{
        type,
        contents:{
          langCode
        }
      },
      relations:{
        contents:true
      },
      select:{
        id:true,
        photo:true,
        type:true,
        contents:{
          region:true,
          title:true,
          langCode:true
        }
      }
    });
  
    return data
  }

  async getOne(id: string,langCode:string) {
    const data = await this.attractionRepository.findOne({
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
      },
      select:{
        id:true,
        photo:true,
        type:true,
        contents:{
          id:true,
          title:true,
          description:true,
          langCode:true,
          region:true,
          tags:{
            id:true,
            title:true
          }
        }
      }
    })
   
    if(!data) return {}

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
      await this.attrContService.change(value.contents, attraction);
    }
  }

  async create(value: CreateAttractionDto) {
    const attraction = new Attraction();
    attraction.type = value.type
    attraction.photo = value?.photo || null
    await this.attractionRepository.save(attraction);

    await this.attrContService.create(value.contents, attraction);
    return attraction;
  }

  async addTag(values: TagTagDto){
    await this.attrContService.addTag(values)
  }

  async removeTag(values: TagTagDto){
    await this.attrContService.removeTag(values)
  }
}
