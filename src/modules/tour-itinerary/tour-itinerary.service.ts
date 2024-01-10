import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CreateTourItineraryContentDto, CreateTourItineraryDto } from './dto';
import { TourItinerary } from './tour-itinerary.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TagService } from '../tag/tag.service';
import { Tour } from '../tour/tour.entity';
import { TagTagDto } from 'src/infra/shared/dto';
import { TourItineraryContent } from './tour-itinerary-content.entity';

@Injectable()
export class TourItineraryService {
  constructor(
    @InjectRepository(TourItinerary)
    private readonly tourItineraryRepo: Repository<TourItinerary>,
    @InjectRepository(TourItineraryContent)
    private readonly tourItiConRepo: Repository<TourItineraryContent>,
    private readonly tagService: TagService,
  ) {}

  async getById(id:string){
    return await this.tourItiConRepo.findOne({
      where:{id},
      relations:{
        tags:true
      }
    })
  }

  async deleteOne(id: string) {
    const response = await this.tourItineraryRepo.delete(id).catch(() => {
      throw new NotFoundException('data not found');
    });
    return response;
  }

  async create(values: CreateTourItineraryDto[], tour: Tour) {
    await Promise.all(
      values.map(async (value) => {
        await this.createItinerary(value,tour)
      }),
    );
  }

  async createItinerary(value: CreateTourItineraryDto, tour: Tour) {
    const data = this.tourItineraryRepo.create({tour});

    await this.tourItineraryRepo.save(data);

    await this.createItineraryContent(value.days,data)
  }

  async createItineraryContent(values:CreateTourItineraryContentDto[], tourItinerary: TourItinerary){
    await Promise.all(
      values.map(async(value)=>{
         await this.createItineraryContentData(value,tourItinerary)
      })
    )
  }

  async createItineraryContentData(day:CreateTourItineraryContentDto,tourItinerary: TourItinerary){
    await this.tourItiConRepo
    .createQueryBuilder()
    .insert()
    .into(TourItineraryContent)
    .values({...day,tourItinerary} as unknown as TourItineraryContent)
    .execute()
  }

  async addTag(values: TagTagDto) {
    const data = await this.getById(values.id);
    const tag = await this.tagService.getOne(values.tagId);
    data.tags.push(tag);

    await this.tourItiConRepo.save(data);

    return data;
  }

  async removeTag(values: TagTagDto) {
    const data = await this.getById(values.id);

    data.tags = data.tags.length
      ? data.tags.filter((t) => t.id != values.tagId)
      : [];

    await this.tourItiConRepo.save(data);

    return data;
  }
}
