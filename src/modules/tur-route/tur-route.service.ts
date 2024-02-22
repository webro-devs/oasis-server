import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import {
  UpdateTourRouteDto,
  CreateTourRouteDto,
  CreateTourRouteListDto,
  UpdateTourRouteListDto,
} from './dto';
import { TourRoute } from './tur-route.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TourRouteService {
  constructor(
    @InjectRepository(TourRoute)
    private readonly tourRouteRepository: Repository<TourRoute>,
  ) {}

  async getAll(langCode:string) {
    const data = await this.tourRouteRepository.find({
      where:{langCode},
      select:{
        id:true,
        title:true,
        description:true,
      }
    });
    return data;
  }

  async getAllForAdmin(langCode:string) {
    const data = await this.tourRouteRepository.find({
      where:{langCode}
    });
    return data;
  }

  async getOneForUpdate(type:string){
    const data = await this.tourRouteRepository.find({
      where:{type}
    })
    return data
  }

  async getByTitle(title: string, langCode: string) {
    const data = await this.tourRouteRepository.findOne({ where: { title } });
    return data;
  }

  async deleteOne(id: string) {
    const response = await this.tourRouteRepository.delete(id);
    return response;
  }

  async change(value: UpdateTourRouteListDto) {
    const updatedData = value.contents.filter((c) => c.id);

    const createdData = value.contents.filter((c) => !c.id);

    await Promise.all(
      updatedData.map(async (v) => {
        await this.tourRouteRepository.update({ id: v.id }, v);
      }),
    );

    await this.create({contents:createdData})
  }

  async create(values: CreateTourRouteListDto) {
    const type = values.contents.find(c=> c.langCode == 'en').title
    await Promise.all(
      values.contents.map(async (c) => {
        await this.createOne(c,type);
      }),
    );
  }

  async createOne(value: CreateTourRouteDto,type:string) {
    const route = await this.getByTitle(value.title, value.langCode);
    if (route) {
      return;
    }
    const data = this.tourRouteRepository.create({...value,type});
    await this.tourRouteRepository.save(data);
  }
}
