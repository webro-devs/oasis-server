import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UpdateSouvenirDto, CreateSouvenirDto } from './dto';
import { Souvenir } from './souvenir.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SouvenirService {
  constructor(
    @InjectRepository(Souvenir)
    private readonly souvenirRepository: Repository<Souvenir>,
  ) {}

  async getAll() {
    return await this.souvenirRepository.find({
      order: {
        title: 'ASC',
      },
    });
  }

  async getOne(id: string) {
    const data = await this.souvenirRepository
      .findOne({
        where: { id },
      })
      .catch(() => {
        throw new NotFoundException('data not found');
      });

    return data;
  }

  async deleteOne(id: string) {
    const response = await this.souvenirRepository.delete(id).catch(() => {
      throw new NotFoundException('data not found');
    });
    return response;
  }

  async change(value: UpdateSouvenirDto, id: string) {
    const response = await this.souvenirRepository.update({ id }, value);
    return response;
  }

  async create(value: CreateSouvenirDto) {
    const data = this.souvenirRepository.create(value);
    return await this.souvenirRepository.save(data);
  }
}
