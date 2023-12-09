import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UpdateTourDto, CreateTourDto } from './dto';
import { Tour } from './tour.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TourService {
  constructor(
    @InjectRepository(Tour)
    private readonly tourRepository: Repository<Tour>,
  ) {}

  async getAll() {
    return await this.tourRepository.find({
      order: {
        title: 'ASC',
      },
    });
  }

  async getOne(id: string) {
    const data = await this.tourRepository
      .findOne({
        where: { id },
      })
      .catch(() => {
        throw new NotFoundException('data not found');
      });

    return data;
  }

  async deleteOne(id: string) {
    const response = await this.tourRepository.delete(id).catch(() => {
      throw new NotFoundException('data not found');
    });
    return response;
  }

  async change(value: UpdateTourDto, id: string) {
    const response = await this.tourRepository.update({ id }, value);
    return response;
  }

  async create(value: CreateTourDto) {
    const data = this.tourRepository.create(value);
    return await this.tourRepository.save(data);
  }
}
