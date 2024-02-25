import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UpdateStaticDto, CreateStaticDto } from './dto';
import { Static } from './static.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StaticService {
  constructor(
    @InjectRepository(Static)
    private readonly staticRepository: Repository<Static>,
  ) {}

  async getAll(langCode:string) {
    const data = await this.staticRepository.find();
    const res = []
    data.forEach(d=>{
      res.push({
        key: d?.key,
        value: d?.value?.[langCode] || ''
      })
    })
    return res;
  }

  async getAllForAdmin(){
    return await this.staticRepository.find({
      order:{
        date:"DESC"
      }
    })
  }

  async deleteOne(id: string) {
    const response = await this.staticRepository.delete(id);
    return response;
  }

  async change(value: UpdateStaticDto, id: string) {
    const response = await this.staticRepository.update({ id }, value);
    return response;
  }

  async create(value: CreateStaticDto) {
    const data = this.staticRepository.create(value);
    return await this.staticRepository.save(data);
  }
}
