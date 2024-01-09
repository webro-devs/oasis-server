import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UpdateAttractionDto, CreateAttractionDto } from './dto';
import { Attraction } from './attraction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AttractionContentService } from '../attraction-content/attraction-content.service';
import { TagTagDto } from 'src/infra/shared/dto';
import slugify from 'slugify';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AttractionService {
  constructor(
    @InjectRepository(Attraction)
    private readonly attractionRepository: Repository<Attraction>,
    private readonly attrContService: AttractionContentService,
    private readonly configService: ConfigService
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
        url:true,
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
      }
    })
   
    if(!data) return {}

    return data;
  }

  async getByUrl(type: string,title:string, langCode: string) {
    const url = this.configService.get('clientUrl') + `${type}/${title}`;
    const data = await this.attractionRepository.findOne({
      where:{
        url
      }
    })
    
    if(!data) return {}

    return this.getOne(data.id, langCode)
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
    const title = value.contents.find((c) => c.langCode == 'en')?.title;

    if (!title) {
      throw new HttpException('short title in english should be exist', 400);
    }
    const url = await this.makeUrl(value.type + '/', title);

    const attraction = new Attraction();

    attraction.type = value.type
    attraction.photo = value?.photo || null
    attraction.url = url
    await this.attractionRepository.save(attraction);

    await this.attrContService.create(value.contents, attraction);
    return attraction;
  }

  async makeUrl(path: string, shortTitle: string) {
    const url =
      this.configService.get('clientUrl') +
      path +
      slugify(shortTitle, { lower: true });

    const isExist = await this.attractionRepository.findOne({
      where: { url },
    });

    if (isExist) {
      return url + '_';
    }

    return url;
  }

  async addTag(values: TagTagDto){
    await this.attrContService.addTag(values)
  }

  async removeTag(values: TagTagDto){
    await this.attrContService.removeTag(values)
  }
}
