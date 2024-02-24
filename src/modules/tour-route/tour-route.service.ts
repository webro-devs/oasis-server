import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';

import {
  UpdateTourRouteDto,
  CreateTourRouteDto,
  CreateTourRouteListDto,
  UpdateTourRouteListDto,
} from './dto';
import { TourRoute } from './tour-route.entity';
import { InjectRepository } from '@nestjs/typeorm';
import slugify from 'slugify';

@Injectable()
export class TourRouteService {
  constructor(
    @InjectRepository(TourRoute)
    private readonly tourRouteRepository: Repository<TourRoute>,
  ) {}

  async getAll(langCode:string) {
    const data = await this.tourRouteRepository.find({
      where:{langCode},
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

  async getByTitleForAdmin(title:string){
     const data = await this.tourRouteRepository.find({
      where:{
        title: ILike(`%${title}%`),
        langCode:'en'
      }
     })
     return data
  }

  async getByTitle(title: string, langCode: string) {
    const data = await this.tourRouteRepository.findOne({ where: { title, langCode } });
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
    const type = slugify(values.contents.find(c=> c.langCode == 'en')?.title)
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
