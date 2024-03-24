import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ILike, In, Repository } from 'typeorm';

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

  async getOneForUpdate(type:string, langCode:string){
    const data = await this.tourRouteRepository.findOne({
      where:{type,langCode}
    })
    return data
  }

  async getByTitleForAdmin(){
     const data = await this.tourRouteRepository.find({
      where:{
        langCode:'en'
      },
      select:{
        id:true,
        title:true,
        type:true
      }
     })
     return data
  }

  async getMoreByTitels(titles: string[]){
     const data = await this.tourRouteRepository.find({
      where:{
        langCode:'en',
        title: In(titles)
      }
     })
     return data
  }

  async getByTitle(title: string, langCode: string,type:string) {
    const data = await this.tourRouteRepository.findOne({ where: { title, langCode,type } });
    return data;
  }

  async deleteOne(id: string) {
    const response = await this.tourRouteRepository.delete(id);
    return response;
  }

  async change(value: UpdateTourRouteListDto, type:string) {
    const updatedData = value.contents.filter((c) => c.id);

    const createdData = value.contents.filter((c) => !c.id);

    await Promise.all(
      updatedData.map(async (v) => {
        await this.tourRouteRepository.update({ id: v.id }, v);
      }),
    );

    await this.create({contents:createdData},type)
  }

  async create(values: CreateTourRouteListDto, newType = '') {
    const type = newType ? newType : slugify(values.contents.find(c=> c.langCode == 'en')?.title)
    await Promise.all(
      values.contents.map(async (c) => {
        await this.createOne(c,type);
      }),
    );
  }

  async createOne(value: CreateTourRouteDto,type:string) {
    const route = await this.getByTitle(value.title, value.langCode,type);
    if (route) {
      return;
    }
    const data = this.tourRouteRepository.create({...value,type});
    await this.tourRouteRepository.save(data);
  }
}
