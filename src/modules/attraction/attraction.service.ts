import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UpdateAttractionDto, CreateAttractionDto } from './dto';
import { Attraction } from './attraction.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AttractionService {
  constructor(
    @InjectRepository(Attraction)
    private readonly attractionRepository: Repository<Attraction>,
  ) {}

  async getAll() {
    return await this.attractionRepository.find({
      order: {
        title: 'ASC',
      },
    });
  }

  async getOne(id: string) {
    const data = await this.attractionRepository
      .findOne({
        where: { id },
      })
      .catch(() => {
        throw new NotFoundException('data not found');
      });

    return data;
  }

  async deleteOne(id: string) {
    const response = await this.attractionRepository.delete(id).catch(() => {
      throw new NotFoundException('data not found');
    });
    return response;
  }

  async change(value: UpdateAttractionDto, id: string) {
    const response = await this.attractionRepository.update({ id }, value);
    return response;
  }

  async create(value: CreateAttractionDto) {
    const data = this.attractionRepository.create(value);
    return await this.attractionRepository.save(data);
  }
}
